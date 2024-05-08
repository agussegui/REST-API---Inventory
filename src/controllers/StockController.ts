import { Request,Response } from "express";
import Stock from "../models/stock";
import Products from "../models/Products";
import Category from "../models/Category";
import Suppliers from "../models/Supplier";

export class StockController {
    static createStock = async (req: Request, res: Response) => {
        
        try {
            const {productsId, categoryId, supplierId} = req.body
            const stock = new Stock(req.body)

            const product = await Products.findById(productsId)
            if(!product){
                return res.status(400).json({message: 'El producto no existe'})
            }

            const category = await Category.findById(categoryId)
            if(!category){
                return res.status(400).json({message: 'La categoria no existe'})
            }

            const supplier = await Suppliers.findById(supplierId)
            if(!supplier){
                return res.status(400).json({message: 'El proveedor no existe'})
            }

            await stock.save()
            res.send('Se agrego al Stock Correctamente')

        } catch (error) {
            res.status(500).json({ message: 'Error al crear la entrada de stock' });
  
        }
    }
}