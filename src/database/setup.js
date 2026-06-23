import db from './db.js';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setupDatabase = async () => {
  try {
    console.log("Connecting to PostgreSQL...");

    const result = await db.query(
        "SELECT NOW() AS current_time"
    );
    
    console.log("Db Connected at:", result.rows[0].current_time)
    return true;

  } catch (error) {
    console.error("Database setup failed:", error.message);
    return false;
  }finally {
    // This close the connection pool only if the method exists
    if (typeof db.close === "function") {
        await db.close
    }
  }
};

export default setupDatabase;