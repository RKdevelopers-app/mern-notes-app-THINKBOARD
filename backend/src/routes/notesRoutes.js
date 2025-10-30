import express from "express";
import { createNote, getNoteByID,  deleteNote, getALlNotes, updateNote } from "../controllers/notesController.js"
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.get("/", getALlNotes);
router.get("/:id", getNoteByID);
// router.get("/:id", rateLimiter,  getNoteByID);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
