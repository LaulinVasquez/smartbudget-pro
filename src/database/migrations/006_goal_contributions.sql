CREATE TABLE IF NOT EXISTS goal_contributions (
    contribution_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    goal_id INTEGER NOT NULL,
    amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
    note TEXT,
    contributed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_contribution_goal FOREIGN KEY (goal_id) REFERENCES goals(goal_id)
        ON DELETE CASCADE
);