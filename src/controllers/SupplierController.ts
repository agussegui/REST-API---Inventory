import { Request, Response } from "express";
import Suppliers from "../models/Supplier";

export class SupplierController{

    static createSupplier = async (req: Request, res: Response) => {
        const supplier =  new Suppliers(req.body)

        try {
            await supplier.save()
            res.send('Categoria agregada correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static getAllSupplier = async (req: Request, res: Response) => {
        try {
            const supplier = await Suppliers.find({})
            res.json(supplier)
        } catch (error) {
            console.log(error)
        }
    }

    static getSupplierById = async (req: Request, res: Response) => {

        const {id} = req.params

        try {
            const supplier = await Suppliers.findById(id)
            if(!supplier){
                const error = new Error('Proeevedor no encontrada')
                return res.status(404).json({error: error.message})
            }
            
            res.json(supplier)
        } catch (error) {
            console.log(error)
        }
    }

    static updateSupplier = async (req: Request, res: Response) => {

        const {id} = req.params

        try {
            const supplier = await Suppliers.findByIdAndUpdate(id,req.body)

            if(!supplier){
                const error = new Error('Categoria no encontrada')
                return res.status(404).json({error: error.message})
            }

            await supplier.save()
            res.send('Proeevedor Actualizado')
            
        } catch (error) {
            console.log(error)
        }
    }

    static deleteSupplier = async (req: Request, res: Response) => {

        const {id} = req.params

        try {
            const supplier = await Suppliers.findById(id)

            if(!supplier){
                const error = new Error('Proeevedor no encontrada')
                return res.status(404).json({error: error.message})
            }

            await supplier.deleteOne()
            res.send('Proeevedor Eliminado')
            
        } catch (error) {
            console.log(error)
        }
    }
}