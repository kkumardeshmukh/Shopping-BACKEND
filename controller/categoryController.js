import categoryModel from "../models/categoryModel.js"
import slugify from 'slugify'

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).send({
                success: false,
                message: "Fill the name in field"
            }
            )
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(500).send({
                success: false,
                message: "Entered category already exist"
            }
            )
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "Category Created Successfully",
            category
        }
        )
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in creating categiry"
        }
        )
    }
}
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        if (!name) {
            return res.status(500).send({
                success: false,
                message: "provide category name to update"
            }
            )
        }
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "category updated successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while updating category"
        })
    }
}

export const getCategoryController = async (req, res) => {

    try {
        const Categories = await categoryModel.find({})

        res.status(200).send({
            success: true,
            message: "all categories are following",
            Categories
        }
        )
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: flase,
            message: "error while fetching all categories"
        })
    }
}

export const singleCategoryController = async (req, res) => {

    try {
        const cate = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "single category",
            cate
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while getting single category"
        })
    }
}

export const deleteCategoryController = async (req, res) => {

    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: false,
            message: "Delete category successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: "error while deletting category"
        })

    }

}