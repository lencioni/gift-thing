import FacebookStrategy from 'passport-facebook';
import express from 'express';
import expressHandlebars from 'express-handlebars';
import passport from 'passport';
import redisStoreFactory from 'connect-redis';
import request from 'request';
import session from 'express-session';

import Queries from './queries';
import config from '../config';

const RedisStore = redisStoreFactory(session);
const app = express();
const debug = require('debug')('app:server');
const paths = config.utils_paths;

// Set the rendering engine used by Express to handlebars. This will let use add
// dynamic content to our templates.
app.engine('.hbs', expressHandlebars({ extname: '.hbs' }));
app.set('view engine', '.hbs');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Queries.findUser(id)
    .catch(err => done(err))
    .then(user => done(null, user));
});

passport.use('facebook',
  new FacebookStrategy({
    clientID: config.fb.app_id,
    clientSecret: config.fb.app_secret,
    callbackURL: config.fb.callback_url,
  },
  // Facebook will send back the tokens and Facebook profile
  (accessToken, refreshToken, profile, done) => {
    // Find the user in the database based on their Facebook ID
    const {
      id: facebookId,
      displayName: name,
    } = profile;

    Queries.findUserFromFacebookId(facebookId)
      .catch(err => done(err))
      .then(user => {
        // If the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        }

        // Save our user to the database
        const emailAddress =
          profile.emails &&
          profile.emails[0] &&
          profile.emails[0].value;

        const newUser = {
          facebookId,
          facebookAccessToken: accessToken,
          name,
          emailAddress,
        };

        Queries.createUser(newUser)
          .catch(err => done(err))
          .then(savedUser => done(null, savedUser));
      });
  })
);

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'fancy feast',
  store: new RedisStore(),
}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/login/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);

app.get('/auth/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => res.redirect('/home')
);

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// API
app.get('/api/me', ensureAuthenticated,
  (req, res) => res.json(req.user));

app.get('/api/users/:id', (req, res) => {
  Queries.findUser(req.params.id)
    .catch(error => res.send(error))
    .then(data => {
      // Sanitize user data to prevent leaking secrets
      const user = {
        id: data.id,
        name: data.name,
      };
      if (req.user && req.user.id === user.id) {
        user.email_address = data.email_address;
      }

      res.json(user);
    });
});

app.get('/api/users/:id/groups', (req, res) => {
  if (!req.user || req.user.id !== req.params.id) {
    res.status(403).json();
  }

  Queries.findUserGroups(req.params.id)
    .catch(error => res.send(error))
    .then(data => res.json(data));
});

// Fallback route to render 404 for missing /api requests
app.use('/api', (req, res) => res.status(404).json());

// END API

// Serve app with Webpack if HMR is enabled
if (config.compiler_enable_hmr) {
  const webpack = require('webpack');
  const webpackConfig = require('../build/webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(require('./middleware/webpack-dev')({
    compiler,
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {
      aggregateTimeout: 0,
      poll: 0,
    },
  }));
  app.use(require('./middleware/webpack-hmr')({ compiler }));

  const getStats = function getStats() {
    const promise = new Promise((resolve, reject) => {
      const poll = 300;
      let attemptsRemaining = 10;

      function tryGetStats() {
        request.get('http://localhost:3000/stats.json', (err, response, body) => {
          if (!err && response.statusCode === 200) {
            return resolve(JSON.parse(body));
          }

          attemptsRemaining--;
          if (attemptsRemaining < 0) {
            return reject(err);
          }

          setTimeout(tryGetStats, poll);
        });
      }

      tryGetStats();
    });

    return promise;
  };

  getStats()
    .catch(err => debug(err))
    .then(stats => {
      debug('Setting up fallback route');
      const publicPath = stats.publicPath;
      const assets = Object.values(stats.assetsByChunkName).map(
        asset => `${publicPath}${asset}`);

      // Fallback route for SPA
      app.get('*', (req, res, next) => {
        if (req.accepts('html')) {
          const initialState = JSON.stringify({
            currentUser: req.user,
          });
          res.render('index', { layout: false, assets, initialState });
        } else {
          next();
        }
      });
    });
} else {
  debug(
    'Application is being run outside of development mode. This starter kit ' +
    'does not provide any production-specific server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.base(config.dir_dist)));
  // TODO: figure out if this is the correct thing to do here
  app.get('*', (req, res, next) => {
    if (req.accepts('html')) {
      res.sendFile(`${config.dir_dist}/index.html`);
    } else {
      next();
    }
  });
}

export default app;
