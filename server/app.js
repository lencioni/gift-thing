import FacebookStrategy from 'passport-facebook';
import Queries from './queries';
import config from '../config';
import express from 'express';
import historyApiFallback from 'connect-history-api-fallback';
import passport from 'passport';
import redisStoreFactory from 'connect-redis';
import session from 'express-session';

const RedisStore = redisStoreFactory(session);
const app = express();
const debug = require('debug')('app:server');
const paths = config.utils_paths;

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

// END API

app.use(historyApiFallback({
  verbose: false,
}));

// Serve app with Webpack if HMR is enabled
if (config.compiler_enable_hmr) {
  const webpack = require('webpack');
  const webpackConfig = require('../build/webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(require('./middleware/webpack-dev')({
    compiler,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(require('./middleware/webpack-hmr')({ compiler }));
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
}

export default app;
