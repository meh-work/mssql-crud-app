import { sql, poolPromise } from "../config/db.js";

export const getTodos = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Todos");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const pool = await poolPromise;
    await pool
      .request()
      .input("title", sql.NVarChar, title)
      .query("INSERT INTO Todos (title) VALUES (@title)");
    res.send("Todo added");
  } catch (err) {
    console.log(err);

    res.status(500).send(err.message);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("completed", sql.Bit, completed)
      .query("UPDATE Todos SET completed = @completed WHERE id = @id");
    res.send("Todo updated");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Todos WHERE id = @id");
    res.send("Todo deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
