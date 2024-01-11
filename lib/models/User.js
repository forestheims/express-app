const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User {
  userID;
  googleID;
  username;
  name;
  email;
  profilePictureURL;
  #passwordHashValue;

  constructor(row) {
    this.userID = row.user_id;
    this.googleID = row.google_id;
    this.name = row.name;
    this.email = row.email;
    this.username = row.username;
    this.profilePictureURL = row.profile_picture_url
    this.#passwordHashValue = row.password_hash_value;
  }

  static async insert({ googleID, name, username, email, profilePictureURL, passwordHashValue }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
          users (google_id, username, name, email, profile_picture_url, password_hash_value)
      VALUES
          ($1, $2, $3, $4, $5, $6)
      RETURNING
          *;
    `,
      [googleID, username, name, email, profilePictureURL, passwordHashValue]
    );
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        email=$1;
    `,
      [email]
    );
    if (!rows[0]) throw new Error('email is not registered');
    return new User(rows[0]);
  }

  get passwordHashValue() {
    return this.#passwordHashValue;
  }

  authToken() {
    return jwt.sign({ ...this }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });
  }
};