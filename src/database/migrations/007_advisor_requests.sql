CREATE TABLE IF NOT EXISTS advisor_requests (
    request_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL,
    advisor_id INTEGER,
    subject VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'submitted' CHECK (
        status IN (
            'submitted',
            'reviewing',
            'accepted',
            'completed',
            'rejected'
        )
    ),
    advisor_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_request_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_request_advisor FOREIGN KEY (advisor_id) REFERENCES users(user_id) ON DELETE
    SET NULL
)