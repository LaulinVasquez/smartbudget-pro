//  This file runs all sql migrations into postgress, instead of running each script one by one
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
    try {
        console.log("Starting migrations...");
        // Select the folder containing sql queries
        const migrationsDir = path.join(__dirname, "migrations");
        const files = await fs.readdir(migrationsDir);

        const migrationFiles = files.filter(file => file.endsWith(".sql")).sort();

        // Run each query (001 to 007)
        for (const file of migrationFiles){
            console.log(`Running ${file}...`);
            const filePath = path.join(migrationsDir, file);
            const sql = await fs.readFile(filePath, "utf8") // utf8 is used to encode the data into string to let Node know otherwise Node would returhn a Buffer

            await db.query(sql);
            console.log(`✅ ${file} completed`)
        }
        console.log("🎉 All migrations completed successfully");
    } catch (error) {
        console.error("❌ Migrations failed");
        console.error(error);
    } finally {
        if (typeof db.close === "function") {
            await db.close();
        }
    }
}
// To run this function you will have to run the migrate script
runMigration();