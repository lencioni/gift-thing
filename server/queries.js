import db from './db';

export default class Queries {
  static findUser(id) {
    return db.oneOrNone('SELECT * FROM users WHERE id = $1', id);
  }

  static findUserFromFacebookId(facebookId) {
    return db.oneOrNone('SELECT * FROM users WHERE facebook_id = $1', facebookId);
  }

  static createUser({ facebookId, facebookAccessToken, name, emailAddress }) {
    return db.one(
      `INSERT INTO users (id, facebook_id, facebook_access_token, name, email_address)
      VALUES (
        uuid_generate_v4(),
        $/facebookId/,
        $/facebookAccessToken/,
        $/name/,
        $/emailAddress/
      ) RETURNING *`,
      { facebookId, facebookAccessToken, name, emailAddress }
    );
  }
}
