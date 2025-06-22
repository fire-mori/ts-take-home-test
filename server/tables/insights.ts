export const createTable = `
  CREATE TABLE insights (
    id INTEGER PRIMARY KEY ASC NOT NULL,
    brandId INTEGER NOT NULL,
    createdAt TEXT NOT NULL,
    text TEXT NOT NULL
  )
`;

export const selectAllStatement = `SELECT * FROM insights`;

export const selectByIdStatement =
  `SELECT * FROM insights WHERE id = ? LIMIT 1`;

export const insertStatement =
  `INSERT INTO insights (brandId, createdAt, text) VALUES (?, ?, ?)`;

export const deleteStatement = `DELETE FROM insights WHERE id = ?`;
