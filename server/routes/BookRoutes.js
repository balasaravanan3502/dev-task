import express from "express";
const router = express.Router();

import { createBook, getBooks } from "../controllers/bookController.js";

router.get("/", getBooks);

router.post("/add", createBook);

export default router;
