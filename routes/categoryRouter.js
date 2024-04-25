import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createCategoryController, updateCategoryController } from "../controller/categoryController.js";

//router configuration
const router = express.Router()

//crating category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

//updating categories
router.put('/update-category', requireSignIn, isAdmin, updateCategoryController)

export default router