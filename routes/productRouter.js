import express from 'express'
import { createProductController, deleteProductController, getProductController, getProductPhotoController, getSingleProductController } from '../controller/productController.js'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'
import formidable from 'express-formidable'

const router = express.Router()

//creating -product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//getting all the products 
router.get('/get-product', getProductController)

//getting single product
router.get('/single-product/:slug', getSingleProductController)

//getting photo of product based on id 
router.get('/product-photo/:pid', getProductPhotoController)

//delete product
router.delete('/delete-product/:pid', deleteProductController)

export default router