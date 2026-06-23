-- This keeps a track of which migrations have already run and skip them automatically
CREATE TABLE IF NOT EXISTS migrations (
    migration_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    file_name VARCHAR(255) UNIQUE NOT NULL,
    executed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);