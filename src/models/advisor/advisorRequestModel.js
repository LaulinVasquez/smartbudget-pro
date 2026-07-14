import db from "../../database/db.js";

//  CREATE - user submits a request
async function createAdvisorRequest(requestData) {
    const {userId, advisorId = null, subject, message, status = "submitted",} = requestData;

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

// READ - user sees their own requests
async function getRequestsByUser(userId) {
    const sql =`
        SELECT
            ar.request_id,
            ar.subject,
            ar.message,
            ar.status,
            ar.created_at,
            ar.advisor_id,
            u.first_name AS advisor_first_name,
            u.last_name AS advisor_last_name
        FROM advisor_requests ar
        LEFT JOIN users u
            ON ar.advisor_id = u.user_id
        WHERE ar.user_id = $1
        ORDER By ar.created_at DESC;
    `;
    const { rows } = await db.query(sql, [userId]);
    return rows;
}

// READ — advisor sees assigned and unassigned requests
async function getRequestsForAdvisor(advisorId) {
  const sql = `
        SELECT
            ar.request_id,
            ar.user_id,
            ar.advisor_id,
            ar.subject,
            ar.message,
            ar.status,
            ar.created_at,
            u.first_name AS user_first_name,
            u.last_name AS user_last_name,
            u.email AS user_email
        FROM advisor_requests ar
        JOIN users u
            ON ar.user_id = u.user_id
        WHERE ar.advisor_id = $1
            OR ar.advisor_id IS NULL
        ORDER BY
            CASE 
                WHEN ar.status = 'submitted' THEN 0
                WHEN ar.status = 'reviewing' THEN 1
                WHEN ar.status = 'accepted' THEN 2
                WHEN ar.status = 'completed' THEN 3
                WHEN ar.status = 'rejected' THEN 4
        ELSE 5
            END,
            ar.created_at DESC;
    `;

    const { rows } = await db.query(sql, [advisorId]);
    return rows;
}
// READ — securely retrieve one request
async function getRequestById(requestId) {
  const sql = `
    SELECT
        ar.request_id,
        ar.user_id,
        ar.advisor_id,
        ar.subject,
        ar.message,
        ar.status,
        ar.created_at,
        u.first_name AS user_first_name,
        u.last_name AS user_last_name,
        u.email AS user_email
    FROM advisor_requests ar
    JOIN users u
        ON ar.user_id = u.user_id
    WHERE ar.request_id = $1;
    `;

    const { rows } = await db.query(sql, [requestId]);
    return rows[0] ?? null;
}

// UPDATE — advisor accepts an unassigned request
async function assignRequestToAdvisor(requestId, advisorId) {
  const sql = `
    UPDATE advisor_requests
    SET
        advisor_id = $1,
        status = 'reviewing'
    WHERE request_id = $2
        AND advisor_id IS NULL
    RETURNING
        request_id,
        advisor_id,
        status;
    `;

    const { rows } = await db.query(sql, [advisorId,requestId,  ]);
    return rows[0] ?? null;
}

// UPDATE — advisor changes request status
async function updateRequestStatus(requestId, advisorId, status) {
  const sql = `
    UPDATE advisor_requests
    SET status = $1
    WHERE request_id = $2
        AND advisor_id = $3
    RETURNING
        request_id,
        advisor_id,
        status;
    `;
    const { rows } = await db.query(sql, [ status, requestId, advisorId,]);
    return rows[0] ?? null;
}

// DELETE — user may delete only their own pending request
async function deleteAdvisorRequest(requestId, userId) {
  const sql = `
    DELETE FROM advisor_requests
    WHERE request_id = $1
        AND user_id = $2
        AND status = 'submitted'
    RETURNING request_id;
  `;

  const { rows } = await db.query(sql, [ requestId, userId,]);
  return rows[0] ?? null;
}

export { createAdvisorRequest, getRequestsByUser, getRequestsForAdvisor, getRequestById, assignRequestToAdvisor, updateRequestStatus, deleteAdvisorRequest, };