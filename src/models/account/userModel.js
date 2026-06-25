import db from "../../database/db.js";

/**
 * Check if email already exists
 */
async function emailExists(email) {
  const sql = `
    SELECT EXISTS(
      SELECT 1
      FROM users
      WHERE email = $1
    ) AS exists
  `;

  const result = await db.query(sql, [email]);

  return result.rows[0].exists;
}

/**
 * Create new user
 */
async function createUser(
  firstName,
  lastName,
  email,
  hashedPassword,
  role = "user",
) {
  const sql = `
    INSERT INTO users (
      first_name,
      last_name,
      email,
      password,
      role
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING
      user_id,
      first_name,
      last_name,
      email,
      role,
      created_at
  `;

  const result = await db.query(sql, [
    firstName,
    lastName,
    email,
    hashedPassword,
    role,
  ]);

  return result.rows[0];
}

/**
 * Find user by email
 */
async function getUserByEmail(email) {
  const sql = `
    SELECT *
    FROM users
    WHERE email = $1
  `;

  const result = await db.query(sql, [email]);

  return result.rows[0];
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

  const result = await db.query(sql, [userId]);

  return result.rows[0];
}

export { emailExists, createUser, getUserByEmail, getUserById };
