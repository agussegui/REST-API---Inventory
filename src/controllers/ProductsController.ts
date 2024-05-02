import { Request, Response } from "express";
import Products from "../models/Products";

export class ProductsController {

    static createProducts = async (req: Request, res: Response) => {
        const product =  new Products(req.body)

        try {
            await product.save()
            res.send('Producto agregado correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static getAllProducts = async (req: Request, res: Response) => {
        try {
            const products = await Products.find({})
            res.json(products)
        } catch (error) {
            console.log(error)
        }
    }

    static getProductsById = async (req: Request, res: Response) => {

        const {id} = req.params

        try {
            const product = await Products.findById(id)

            if(!product){
                const error = new Error('Producto no encontrado')
                return res.status(404).json({error: error.message})
            }
            res.json(product)
        } catch (error) {
            console.log(error)
        }
    }

    static updateProducts = async (req: Request, res: Response) => {

        const {id} = req.params

        try {
            const product = await Products.findByIdAndUpdate(id,req.body)

            if(!product){
                const error = new Error('Producto no encontrado')
                return res.status(404).json({error: error.message})
            }

            await product.save()
            res.send('Producto Actualizado')
            
        } catch (error) {
            console.log(error)
        }
    }

    static deleteProducts = async (req: Request, res: Response) => {

        const {id} = req.params

        try {

            const product = await Products.findById(id)

            if(!product){
                const error = new Error('Producto no encontrado')
                return res.status(404).json({error: error.message})
            }

            await product.deleteOne()
            res.send('Proyecto Eliminado')
            
        } catch (error) {
            console.log(error)
        }
    }

}