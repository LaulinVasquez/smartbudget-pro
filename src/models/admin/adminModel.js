import db from "../../database/db.js";

async function getAdmingSummary() {
    const sql =`
        SELECT
            COUNT(*) FILTER (WHERE role = 'user') AS total_users,
            COUNT(*) FILTER (WHERE role = 'advisor') AS total_advisors,
            COUNT(*) FILTER (WHERE role = 'admin') AS total_admins,
            COUNT(*) AS total_accounts
        FROM users;
    `;
    const { rows } = await db.query(sql);
    return rows[0] ?? null;
}

async function getAllUsersForAdmin() {
    const sql =`
        SELECT
            user_id,
            first_name,
            last_name,
            email,
            role,
            created_at,
        FROM users
        ORDER BY created_at DESC;
    `;
    const { rows } = await db.query(sql);
    return rows ?? null;
}

async function updateUserRole(userId, role) {
    const sql=`
        UPDATE users
        SET
            role = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $2
        RETURNING
            user_id,
            first_name,
            last_name,
            email,
            role;
    `;
    const { rows } = await db.query(sql, [userId, role]);
    return rows[0] ?? null;
}

async function getCategoryCount() {
    const sql=`
        SELECT COUNT(*) AS total_categories
        FROM categories;
    `;
    const { rows } = await db.query(sql);
    return Number(rows[0].total_categories);
}

async function getAdvisorRequestCount() {
    const sql = `
        SELECT COUNT(*) AS total_requests
        FROM advisor_requests;
    `;
    const { rows } = await db.query(sql);
    return Number(rows[0].total_requests);
}

export { getAdminSummary, getAllUsersForAdmin, updateUserRole, getCategoryCount, getAdvisorRequestCount, };