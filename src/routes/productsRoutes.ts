import { Router } from "express";
import { body, param } from "express-validator";
import { ProductsController } from "../controllers/ProductsController";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post('/', 

    body('nameProduct')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('description')
        .notEmpty().withMessage('La descripcion no puede ir vacia'),
    body('price')
        .notEmpty().withMessage('El precio no puede ir vacio'),  
    body('amountAvailability')
        .notEmpty().withMessage('La cantidad de productos no puede ir vacio'),        
    body('dateCreate')
        .notEmpty().withMessage('La fecha de creacion no puede ir vacia'),     

    handleInputErrors,        
    ProductsController.createProducts
)
router.get('/', ProductsController.getAllProducts)

router.get('/:id', 

    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProductsController.getProductsById
)

router.put('/:id', 

    param('id').isMongoId().withMessage('ID no valido'),
    body('nameProduct')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('description')
        .notEmpty().withMessage('La descripcion no puede ir vacia'),
    body('price')
        .notEmpty().withMessage('El precio no puede ir vacio'),  
    body('amountAvailability')
        .notEmpty().withMessage('La cantidad de productos no puede ir vacio'),        
    body('dateCreate')
        .notEmpty().withMessage('La fecha de creacion no puede ir vacia'),   

    handleInputErrors,
    ProductsController.updateProducts
)

router.delete('/:id', 

    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProductsController.deleteProducts
)


export default router