import db from "../../database/db.js";

async function getDashboardSummary(userId) {
    const sql = `SELECT
                    COALESCE(SUM(CASE WHEN transaction_type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
                    COALESCE(SUM(CASE WHEN transaction_type = 'expense' THEN amount ELSE 0 END), 0) AS total_expenses,
                    COALESCE(SUM(CASE WHEN transaction_type = 'income' THEN amount ELSE -amount END), 0) AS current_balance
                FROM transactions
                WHERE user_id = $1;
                `;

    const { rows } = await db.query(sql, [userId]);
    return rows[0];
}

async function getRecentTransactions(userId) {
    const sql = `SELECT t.transaction_id, t.amount, t.transaction_type, t.description, t.transaction_date c.name AS category_name
                FROM transaction t
                LEFT JOIN categories c
                    ON t.category_id = c.category_id
                WHERE t.user_id = $1
                ORDER BY t.transaction_date DESC, t.created_at DESC
                LIMIT 5;
                `;
    const { rows } = await db.query(sql, [userId]);
    return rows;
}

export {getDashboardSummary, getRecentTransactions};