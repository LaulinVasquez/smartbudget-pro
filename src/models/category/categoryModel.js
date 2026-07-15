import db from "../../database/db.js";

// READ
async function getAllCategories() {
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

async function createCategories(categoryData) {
  const { name, description } = categoryData;

  const sql = `
    INSERT INTO categories (name, description)
    VALUES ($1, $2)
    RETURNING
      category_id,
      name,
      description,
      created_at;
  `;

  const { rows } = await db.query(sql, [name, description]);
  return rows[0] ?? null;
}

async function updateCategory(categoryId, categoryData) {
  const { name, description } = categoryData;

  const sql = `
    UPDATE categories
    SET
      name = $1,
      description = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE category_id = $3
    RETURNING
      category_id,
      name,
      description,
      updated_at;
  `;

  const { rows } = await db.query(sql, [
    name,
    description,
    categoryId,
  ]);

  return rows[0] ?? null;
}

async function deleteCategory(categoryId) {
  const sql = `
    DELETE FROM categories
    WHERE category_id = $1
    RETURNING category_id;
  `;

  const { rows } = await db.query(sql, [categoryId]);
  return rows[0] ?? null;
}

export {getAllCategories, getCategoryById, createCategories, updateCategory, deleteCategory};