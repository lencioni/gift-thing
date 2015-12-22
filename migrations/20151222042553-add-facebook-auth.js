'use strict';

const async = require('async');

exports.up = function up(db, done) {
  async.series([
    db.addColumn.bind(db, 'users', 'facebook_id', 'string'),
    db.addColumn.bind(db, 'users', 'facebook_access_token', 'string'),
    db.addIndex.bind(db, 'users', 'users_facebook_id_key', ['facebook_id'], true),
  ], done);
};

exports.down = function down(db, done) {
  async.series([
    db.removeColumn.bind(db, 'users', 'facebook_id'),
    db.removeColumn.bind(db, 'users', 'facebook_access_token'),
    db.removeIndex.bind(db, 'users', 'users_facebook_id_key'),
  ], done);
};
