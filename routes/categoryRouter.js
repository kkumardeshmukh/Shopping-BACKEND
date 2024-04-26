import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createCategoryController, deleteCategoryController, getCategoryController, singleCategoryController, updateCategoryController } from "../controller/categoryController.js";

//router configuration
const router = express.Router()

//creating category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

//updating categories
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

//get all catagories
router.get('/get-category', getCategoryController)

//get single category by its slug
router.get('/single-category/:slug', singleCategoryController)

//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router