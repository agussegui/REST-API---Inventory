import type {Request, Response, NextFunction} from 'express' 
import Categories, { ICategory } from "../models/Category";

declare global{
    namespace Express {
        interface Request {
            category: ICategory
        }
    }
}

export async function validateCategoryExists(req: Request, res: Response, next: NextFunction) {

    try {
        const {categoryId} = req.params
        const category = await Categories.findById(categoryId)
        if(!category){
            const error = new Error('Categoria no encontrada')
            return res.status(404).json({error: error.message})
        }
        req.category = category
        next()
    } catch (error) {
        res.status(500).json({error: 'hubo un error'})
    }

}

