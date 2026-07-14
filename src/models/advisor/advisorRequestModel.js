import db from "../../database/db.js";

//  CREATE - user submits a request
async function createAdvisorRequest(requestData) {
    const {userId, advisorId = null, subject, message, status = "pending",} = requestData;

    const sql =`
        INSERT INTO advisor_requests (
            user_id,
            advisor_id,
            subject,
            message,
            status
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
            request_id,
            user_id,
            advisor_id,
            subject,
            message,
            status,
            created_at;
        `;
    const { rows } = await db.query(sql, [userId, advisorId, subject, message, status]);
    return rows[0] ?? null;
}