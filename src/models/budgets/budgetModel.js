import db from "../../database/db.js";

// CREATE
async function createBudget(budgetData) {
  const { userId, categoryId, month, year, amount } = budgetData;

  const sql = `
        INSERT INTO budgets (
            user_id,
            category_id,
            month,
            year,
            amount
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING 
            budget_id,
            user_id,
            category_id,
            month,
            year,
            amount,
            created_at;
        `;
  const { rows } = await db.query(sql, [
    userId,
    categoryId,
    month,
    year,
    amount,
  ]);

  return rows[0] ?? null;
}

// READ

async function getBudgetsByUser(userId) {
  const sql = `
    SELECT
      b.budget_id,
      b.user_id,
      b.category_id,
      b.month,
      b.year,
      b.amount,
      b.created_at,
      b.updated_at,
      c.name AS category_name
    FROM budgets b
    JOIN categories c
      ON b.category_id = c.category_id
    WHERE b.user_id = $1
    ORDER BY b.year DESC, b.month DESC, c.name ASC;
  `;
  const { rows } = await db.query(sql, [userId]);

  return rows;
}

async function getBudgetById(budgetId, userId) {
  const sql = `
    SELECT
      budget_id,
      user_id,
      category_id,
      month,
      year,
      amount,
      created_at,
      updated_at
    FROM budgets
    WHERE budget_id = $1
      AND user_id = $2;
  `;

  const { rows } = await db.query(sql, [budgetId, userId]);

  return rows[0] ?? null;
}

// UPDATE
async function updateBudget(budgetId, userId, budgetData) {
  const { categoryId, month, year, amount } = budgetData;

  const sql = `
    UPDATE budgets
    SET
      category_id = $1,
      month = $2,
      year = $3,
      amount = $4,
      updated_at = CURRENT_TIMESTAMP
    WHERE budget_id = $5
      AND user_id = $6
    RETURNING
      budget_id,
      user_id,
      category_id,
      month,
      year,
      amount,
      updated_at;
  `;

  const { rows } = await db.query(sql, [
    categoryId,
    month,
    year,
    amount,
    budgetId,
    userId,
  ]);

  return rows[0] ?? null;
}

// DELETE
async function deleteBudget(budgetId, userId) {
  const sql = `
    DELETE FROM budgets
    WHERE budget_id = $1
      AND user_id = $2
    RETURNING budget_id;
  `;

  const { rows } = await db.query(sql, [budgetId, userId]);

  return rows[0] ?? null;
}

export { createBudget, getBudgetsByUser, getBudgetById, updateBudget, deleteBudget,};
