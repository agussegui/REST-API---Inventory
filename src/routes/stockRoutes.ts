import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { StockController } from "../controllers/StockController";

const router = Router()

router.post('/',
    body('category')
        .notEmpty().withMessage('La categoria no puede ir vacio'),
    body('products')
        .notEmpty().withMessage('La descripcion no puede ir vacia'),
    body('supplier')
        .notEmpty().withMessage('El precio no puede ir vacio'),
    body('proof')
        .notEmpty().withMessage('La cantidad habilitada no puede ir vacia '),
    body('existenceInicial')
        .notEmpty().withMessage('La fecha no puede ir vacia'),
    body('existenceNow')
        .notEmpty().withMessage('El nombre de la categoria no puede ir vacio'),
    body('priceBuy')
        .notEmpty().withMessage('La descripcion no puede ir vacia'),
    body('priceSale')
        .notEmpty().withMessage('El precio no puede ir vacio'),
    body('Deadline')
        .notEmpty().withMessage('La cantidad habilitada no puede ir vacia '),
    handleInputErrors,
    StockController.createStock
)

export default router