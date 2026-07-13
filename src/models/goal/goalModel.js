import db from "../../database/db.js";

// CREATE
async function createGoal(goalData) {
    const {
        userId,
        name,
        description,
        targetAmount,
        targetDate,
        status = "active",
    } = goalData;

    const sql = `
        IMSERT INTO goals (
            user_id,
            name,
            description,
            target_amount,
            target_date,
            status
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
            goal_id,
            user_id,
            name,
            description,
            target_amount,
            target_date,
            status,
            created_at;
        `;
    const { rows } = await db.query(sql, [userId, name, description, targetAmount, targetDate, status,]);

    return rows[0] ?? null;
}

// READ
async function getGoalsByUser(userId) {
  const sql = `
    SELECT
      g.goal_id,
      g.user_id,
      g.name,
      g.description,
      g.target_amount,
      g.target_date,
      g.status,
      g.created_at,
      g.updated_at,

      COALESCE(
        SUM(gc.amount),
        0
      ) AS current_amount

    FROM goals g

    LEFT JOIN goal_contributions gc
      ON gc.goal_id = g.goal_id

    WHERE g.user_id = $1

    GROUP BY
      g.goal_id

    ORDER BY
      g.created_at DESC;
  `;

  const { rows } = await db.query(sql, [userId]);

  return rows.map((goal) => {
    const targetAmount = Number(goal.target_amount);
    const currentAmount = Number(goal.current_amount);

    const percentage =
      targetAmount > 0
        ? Math.min((currentAmount / targetAmount) * 100, 100)
        : 0;

    return {
      ...goal,
      target_amount: targetAmount,
      current_amount: currentAmount,
      percentage,
    };
  });
}

async function getGoalById(goalId, userId) {
  const sql = `
    SELECT
      g.goal_id,
      g.user_id,
      g.name,
      g.description,
      g.target_amount,
      g.target_date,
      g.status,
      g.created_at,
      g.updated_at,

      COALESCE(
        SUM(gc.amount),
        0
      ) AS current_amount

    FROM goals g

    LEFT JOIN goal_contributions gc
      ON gc.goal_id = g.goal_id

    WHERE g.goal_id = $1
      AND g.user_id = $2

    GROUP BY
      g.goal_id;
  `;

  const { rows } = await db.query(sql, [
    goalId,
    userId,
  ]);

  if (!rows[0]) {
    return null;
  }

  const goal = rows[0];
  const targetAmount = Number(goal.target_amount);
  const currentAmount = Number(goal.current_amount);

  return {
    ...goal,
    target_amount: targetAmount,
    current_amount: currentAmount,
    percentage:
      targetAmount > 0
        ? Math.min((currentAmount / targetAmount) * 100, 100)
        : 0,
  };
}

// UPDATE
async function updateGoal(goalId, userId, goalData) {
  const {
    name,
    description,
    targetAmount,
    targetDate,
    status,
  } = goalData;

  const sql = `
    UPDATE goals
    SET
      name = $1,
      description = $2,
      target_amount = $3,
      target_date = $4,
      status = $5,
      updated_at = CURRENT_TIMESTAMP
    WHERE goal_id = $6
      AND user_id = $7
    RETURNING
      goal_id,
      user_id,
      name,
      description,
      target_amount,
      target_date,
      status,
      updated_at;
  `;

  const { rows } = await db.query(sql, [
    name,
    description,
    targetAmount,
    targetDate,
    status,
    goalId,
    userId,
  ]);

  return rows[0] ?? null;
}

// DELETE
async function deleteGoal(goalId, userId) {
  const sql = `
    DELETE FROM goals
    WHERE goal_id = $1
      AND user_id = $2
    RETURNING goal_id;
  `;

  const { rows } = await db.query(sql, [
    goalId,
    userId,
  ]);

  return rows[0] ?? null;
}

// CONTRIBUTIONS
async function addGoalContribution(contributionData) {
  const {
    goalId,
    amount,
    note,
  } = contributionData;

  const sql = `
    INSERT INTO goal_contributions (
      goal_id,
      amount,
      note
    )
    VALUES ($1, $2, $3)
    RETURNING
      contribution_id,
      goal_id,
      amount,
      note,
      contributed_at;
  `;

  const { rows } = await db.query(sql, [
    goalId,
    amount,
    note,
  ]);

  return rows[0] ?? null;
}

export { createGoal, getGoalsByUser, getGoalById, updateGoal, deleteGoal, addGoalContribution, };