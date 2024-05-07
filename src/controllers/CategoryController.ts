import { Request, Response } from "express";
import Category from "../models/Category";

export class CategoryController {

    static createCategories = async (req: Request, res: Response) => {
        const category =  new Category(req.body)

        try {
            await category.save()
            res.send('Categoria agregada correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static getAllCategory = async (req: Request, res: Response) => {
        try {
            const categories = await Category.find({})
            res.json(categories)
        } catch (error) {
            console.log(error)
        }
    }

    static getCategoryById = async (req: Request, res: Response) => {

        const {id} = req.params

        try {
            const category = await Category.findById(id).populate('products')
            if(!category){
                const error = new Error('Categoria no encontrada')
                return res.status(404).json({error: error.message})
            }
            
            res.json(category)
        } catch (error) {
            console.log(error)
        }
    }

    static updateCategory = async (req: Request, res: Response) => {

        const {id} = req.params

        try {
            const categories = await Category.findByIdAndUpdate(id,req.body)

            if(!categories){
                const error = new Error('Categoria no encontrada')
                return res.status(404).json({error: error.message})
            }

            await categories.save()
            res.send('Categoria Actualizada')
            
        } catch (error) {
            console.log(error)
        }
    }

    static deleteCategory = async (req: Request, res: Response) => {

        const {id} = req.params

        try {
            const category = await Category.findById(id)

            if(!category){
                const error = new Error('Categoria no encontrada')
                return res.status(404).json({error: error.message})
            }

            await category.deleteOne()
            res.send('Categoria Eliminada')
            
        } catch (error) {
            console.log(error)
        }
    }
}