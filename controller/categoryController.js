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

export const updateCategoryController = () => { }