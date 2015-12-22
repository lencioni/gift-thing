'use strict';

const async = require('async');

exports.up = function up(db, callback) {
  async.series([
    db.createTable.bind(db, 'users', {
      id: { type: 'uuid', primaryKey: true },
      name: 'string',
      email_address: 'string',
      created_at: { type: 'timestamp', defaultValue: 'now' },
      updated_at: { type: 'timestamp', defaultValue: 'now' },
    }),

    db.createTable.bind(db, 'items', {
      id: { type: 'uuid', primaryKey: true },
      name: 'string',
      description: 'string',
      cost: 'int',
      created_at: { type: 'timestamp', defaultValue: 'now' },
      updated_at: { type: 'timestamp', defaultValue: 'now' },
    }),

    db.createTable.bind(db, 'user_items', {
      user_id: 'uuid',
      type_id: 'uuid',
      quantity: 'int',
      order: 'int',
      created_at: { type: 'timestamp', defaultValue: 'now' },
      updated_at: { type: 'timestamp', defaultValue: 'now' },
      bought_at: 'timestamp',
    }),

    db.createTable.bind(db, 'follows', {
      user_id: 'uuid',
      follows_user_id: 'uuid',
      created_at: { type: 'timestamp', defaultValue: 'now' },
      updated_at: { type: 'timestamp', defaultValue: 'now' },
    }),

    db.createTable.bind(db, 'groups', {
      id: { type: 'uuid', primaryKey: true },
      name: 'string',
      description: 'text',
      created_at: { type: 'timestamp', defaultValue: 'now' },
      updated_at: { type: 'timestamp', defaultValue: 'now' },
    }),

    db.createTable.bind(db, 'user_groups', {
      user_id: 'uuid',
      group_id: 'uuid',
      created_at: { type: 'timestamp', defaultValue: 'now' },
      updated_at: { type: 'timestamp', defaultValue: 'now' },
    }),
  ], callback);
};

exports.down = function down(db, callback) {
  async.series([
    db.dropTable.bind(db, 'users'),
    db.dropTable.bind(db, 'items'),
    db.dropTable.bind(db, 'user_items'),
    db.dropTable.bind(db, 'follows'),
    db.dropTable.bind(db, 'groups'),
    db.dropTable.bind(db, 'user_groups'),
  ], callback);
};
