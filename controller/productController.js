import productModel from "../models/productModel.js"
import slugify from "slugify"
import formidable from 'express-formidable'
import fs from 'fs'




export const createProductController = async (req, res) => {

    try {

        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        //validation of data

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" })
            case !description:
                return res.status(500).send({ error: "Description is required" })
            case !price:
                return res.status(500).send({ error: "price is required" })
            case !category:
                return res.status(500).send({ error: "category is required" })
            case !quantity:
                return res.status(500).send({ error: "quantity is required" })
            case !shipping:
                return res.status(500).send({ error: "shipping is required" })
            case !photo:
                return res.status(500).send({ error: "photo is required" })
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type

        }

        await products.save()

        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            products,
        })


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error while creating the product"
        })

    }
}


export const getProductController = async (req, res) => {

    try {

        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })

        res.status(200).send({
            success: true,
            message: 'All the product',
            count: products.length,
            products
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: true,
            message: "error while getting product",
            error: error.message
        })

    }
}

export const getSingleProductController = async (req, res) => {

    try {

        const { slug } = req.params
        const product = await productModel.findOne({ slug: slug }).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message: 'single product',
            product
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: true,
            message: "error while getting product",
            error: error.message
        })
    }
}

export const getProductPhotoController = async (req, res) => {

    try {

        const product = await productModel.findById(req.params.pid).select('photo')

        if (product.photo.data) {
            res.set('content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data)

        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error while getting product photo",
            error
        })
    }
}

export const deleteProductController = async (req, res) => {

    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success: true,
            message: 'product deleted successfully'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error while delete product",
            error
        })
    }


}