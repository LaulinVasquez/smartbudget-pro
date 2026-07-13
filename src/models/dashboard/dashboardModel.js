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
  const sql = `SELECT
                    t.transaction_id,
                    t.amount,
                    t.transaction_type,
                    t.description,
                    t.transaction_date,
                    c.name AS category_name
                FROM transactions t
                LEFT JOIN categories c
                    ON t.category_id = c.category_id
                WHERE t.user_id = $1
                ORDER BY t.transaction_date DESC, t.created_at DESC
                LIMIT 5;
                `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}

async function getBudgetProgress(userId) {
  const sql = `
    SELECT
      b.budget_id,
      b.amount AS budget_amount,
      b.month,
      b.year,
      c.name AS category_name,

      COALESCE(
        SUM(
          CASE
            WHEN t.transaction_type = 'expense'
            THEN t.amount
            ELSE 0
          END
        ),
        0
      ) AS spent_amount

    FROM budgets b

    JOIN categories c
      ON b.category_id = c.category_id

    LEFT JOIN transactions t
      ON t.user_id = b.user_id
      AND t.category_id = b.category_id
      AND EXTRACT(MONTH FROM t.transaction_date) = b.month
      AND EXTRACT(YEAR FROM t.transaction_date) = b.year

    WHERE b.user_id = $1

    GROUP BY
      b.budget_id,
      b.amount,
      b.month,
      b.year,
      c.name

    ORDER BY b.year DESC, b.month DESC, c.name ASC

    LIMIT 5;
  `;

  const { rows } = await db.query(sql, [userId]);

  return rows.map((budget) => {
    const budgetAmount = Number(budget.budget_amount);
    const spentAmount = Number(budget.spent_amount);

    const percentage =
      budgetAmount > 0
        ? Math.min((spentAmount / budgetAmount) * 100, 100)
        : 0;

    return {
      ...budget,
      budget_amount: budgetAmount,
      spent_amount: spentAmount,
      percentage,
    };
  });
}

export { getDashboardSummary, getRecentTransactions,getBudgetProgress };
