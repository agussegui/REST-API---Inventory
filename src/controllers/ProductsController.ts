import { Request, Response } from "express";
import Products from "../models/Products";

export class ProductsController {

    static createProducts = async (req: Request, res: Response) => {
        
        try {
            const product =  new Products(req.body)

            product.category = req.category.id
            req.category.products.push(product.id)  
            await Promise.allSettled([product.save(),req.category.save()])

            res.send('Producto agregado correctamente')
        } catch (error) {
            res.status(500).json({error: 'hubo un error'})
        }
    }

    static getCategoryProducts = async (req: Request, res: Response) => {
        try {
            const products = await Products.find({category: req.category.id}).populate('category')
            res.json(products)
        } catch (error) {
            res.status(500).json({error: 'hubo un error'})
        }
    }

    static getProductsById = async (req: Request, res: Response) => {

        try {
            const {productsId} = req.params
            const product = await Products.findById(productsId)
            if(!product){
                const error = new Error('Producto no encontrado')
                return res.status(404).json({error: error.message})
            }
            if(product.category.toString() !== req.category.id){
                const error = new Error('Producto no encontrado')
                return res.status(404).json({error: error.message})
            }

            res.json(product)
        } catch (error) {
            res.status(500).json({error: 'hubo un error'})
        }
    }

    static updateProducts = async (req: Request, res: Response) => {

        try {
            const {productsId} = req.params
            const product = await Products.findById(productsId)
            if(!product){
                const error = new Error('Producto no encontrado')
                return res.status(404).json({error: error.message})
            }
            if(product.category.toString() !== req.category.id){
                const error = new Error('Producto no encontrado')
                return res.status(404).json({error: error.message})
            }

            product.nameProduct = req.body.nameProduct
            product.description = req.body.description
            product.price = req.body.price
            product.amountAvailability = req.body.amountAvailability
            await product.save()
            res.send('Producto Actualizado Correctamente')
        } catch (error) {
            res.status(500).json({error: 'hubo un error'})
        }
    }

    static deleteProducts = async (req: Request, res: Response) => {

        try {
            const {productsId} = req.params
            const product = await Products.findById(productsId, req.body)
            if(!product){
                const error = new Error('Producto no encontrado')
                return res.status(404).json({error: error.message})
            }
            req.category.products = req.category.products.filter(products => products.toString() !== productsId) 
            await Promise.allSettled([product.deleteOne(), req.category.save()])

            res.send('Tarea Eliminada Correctamente')
        } catch (error) {
            res.status(500).json({error: 'hubo un error'})
        }
    }

    

}