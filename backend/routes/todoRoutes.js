// const express = require("express");
import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controller/todoController.js";
const router = express.Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
