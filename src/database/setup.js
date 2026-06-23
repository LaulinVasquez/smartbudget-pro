import db from './db.js';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setupDatabase = async () => {
  try {
    console.log("Setting up database...");

    await db.query(`
      CREATE TABLE IF NOT EXISTS test_connection (
        id SERIAL PRIMARY KEY,
        message VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Test table created successfully");

    // optional insert test row
    await db.query(`
      INSERT INTO test_connection (message)
      VALUES ('Smart Budget Pro DB is working!')
    `);

    console.log("Test row inserted");

    return true;
  } catch (error) {
    console.error("Database setup failed:", error.message);
    return false;
  }
};

const testConnection = async () => {
  const result = await db.query("SELECT NOW() as current_time");
  console.log("DB connected at:", result.rows[0].current_time);
  return true;
};

export { setupDatabase, testConnection };