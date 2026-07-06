import db from "../../database/db.js";

// READ
async function getAllcategories() {
  const sql = `SELECT category_id, name, description
                 FROM categories
                 ORDER BY name ASC;
                `;
  const { rows } = await db.query(sql);
  return rows;
}

async function getCategoryById(categoryId) {
  const sql = `SELECT category_id, name, description
                FROM categories
                WHERE category_id = $1;
                `;
  const { rows } = await db.query(sql, [categoryId]);
  return rows[0] ?? null;
}

export {getAllcategories, getCategoryById};