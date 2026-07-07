import db from "../../database/db.js";

// This model contains CRUD methods for sql queries

// CREATE

async function createTransaction(transactionData) {
  const {
    userId,
    categoryId,
    amount,
    transactionType,
    description,
    transactionDate,
  } = transactionData;

  const sql = `INSERT INTO transactions (user_id, category_id, amount, transaction_type, description, transaction_date)
                    VALUES ($1,$2,$3,$4,$5,$6)
                    RETURNING transaction_id, user_id, amount, transaction_type, description, transaction_date, created_at`;

  const { rows } = await db.query(sql, [
    userId,
    categoryId,
    amount,
    transactionType,
    description,
    transactionDate,
  ]);

  return rows[0] ?? null;
}

// READ

async function getTransactionsByUser(userId) {
  const sql = `SELECT t.transaction_id, t.amount, t.transaction_type, t.description, t.transaction_date, t.created_at, c.name AS category_name
                 FROM transactions t
                 LEFT JOIN categories c
                    ON t.category_id = c.category_id
                    WHERE t.user_id = $1
                    ORDER BY t.transaction_date DESC, t.created_at DESC;
    `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}

async function getTransactionById(transactionId, userId) {
  const sql = `SELECT transaction_id, user_id, category_id, amount, transaction_type, description, transaction_date, created_at, updated_at
                 FROM transactions
                 WHERE transaction_id = $1
                    AND user_id = $2;
                `;

  const { rows } = await db.query(sql, [transactionId, userId]);
  return rows[0] ?? null;
}

// UPDATE

async function updateTransaction(transactionId, userId, transactionData) {
  const { categoryId, amount, transactionType, description, transactionDate } =
    transactionData;

  const sql = `
        UPDATE transactions SET
            category_id = $1,
            amount = $2,
            transaction_type = $3,
            description = $4,
            transaction_date = $5,
            updated_at = CURRENT_TIMESTAMP
        WHERE transaction_id = $6
            AND user_id = $7
        RETURNING
            transaction_id,
            user_id,
            category_id
            amount,
            transaction_type,
            description,
            transaction_date,
            updated_at;
        `;

    const  { rows } = await db.query(sql, [categoryId, amount, transactionType, description, transactionDate, transactionId, userId]);
    return rows[0] ?? null;
}

// DELETE
async function deleteTransaction(transactionId, userId) {
    const sql = `DELETE FROM transactions
                 WHERE transaction_id = $1
                    AND user_id = $2
                 RETURNING transaction_id;
                `;
    const { rows } = await db.query(sql, [transactionId, userId]);
    return rows[0] ?? null;
}

export {createTransaction, getTransactionsByUser, getTransactionById, updateTransaction, deleteTransaction};