import db from "../../database/db.js";

/**
 * Create new user
 * @param {Object} user
 * @return {Promise<Object>}
 *  CREATE
 */

async function createUser(user) {
  const { firstName, lastName, email, password, role = "user" } = user;

  const sql = `
    INSERT INTO users ( first_name, last_name, email, password, role)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING user_id, first_name, last_name, email, role, created_at
  `;

  const { rows } = await db.query(sql, [ firstName, lastName, email, password, role, ]);

  return rows[0];
}

//   READ

//   Check if email already exists
async function emailExists(email) {
  const sql = `
    SELECT EXISTS(
      SELECT 1
      FROM users
      WHERE email = $1
    ) AS exists
  `;

  const { rows } = await db.query(sql, [email]);

  return rows[0].exists;
}

/**
 * Find user by id
 */
async function getUserById(userId) {
  const sql = `
    SELECT
      user_id,
      first_name,
      last_name,
      email,
      role,
      created_at
    FROM users
    WHERE user_id = $1
  `;

  const { rows } = await db.query(sql, [userId]);

  return rows[0] ?? null;
}

/**
 * Get a user by email / used during login.
 */
async function getUserByEmail(email) {
  const sql = `
    SELECT *
    FROM users
    WHERE email = $1;
  `;

  const { rows } = await db.query(sql, [email]);
  return rows[0] ?? null;
}

/**
 * Retrieve all users.
 *
 * @returns {Promise<Array>}
 */
async function getAllUsers() {
  const sql = `
    SELECT user_id, first_name, last_name, email, role, created_at
    FROM users
    ORDER BY created_at DESC;
  `;

  const { rows } = await db.query(sql);

  return rows;
}

export { emailExists, createUser, getUserByEmail, getUserById };
