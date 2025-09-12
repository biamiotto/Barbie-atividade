import express from "express";
import { getAllBarbies, getBarbieById, createBarbie } from "../controllers/barbieController.js";

const router = express.Router();

router.get("/", getAllBarbies);
router.get("/:id", getBarbieById);
router.post("/", createBarbie);

export default router;