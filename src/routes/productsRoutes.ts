import { Router } from "express";
import { body, param } from "express-validator";
import { ProductsController } from "../controllers/ProductsController";
import { handleInputErrors } from "../middleware/validation";
import { validateCategoryExists } from "../middleware/category";

const router = Router()

router.param('categoryId', validateCategoryExists)

router.post('/:categoryId/products', 

    body('nameProduct')
        .notEmpty().withMessage('El nombre de la categoria no puede ir vacio'),
    body('description')
        .notEmpty().withMessage('La descripcion no puede ir vacia'),
    body('price')
        .notEmpty().withMessage('El precio no puede ir vacio'),
    body('amountAvailability')
        .notEmpty().withMessage('La cantidad habilitada no puede ir vacia '),
    body('dateCreate')
        .notEmpty().withMessage('La fecha no puede ir vacia'),

    handleInputErrors,    
    ProductsController.createProducts
)

router.get('/:categoryId/products', 

    ProductsController.getCategoryProducts
)

router.get('/:categoryId/products/:productsId', 

    param('productsId').isMongoId().withMessage('ID no valido'),

    handleInputErrors,
    ProductsController.getProductsById
)

router.put('/:categoryId/products/:productsId', 

    param('productsId').isMongoId().withMessage('ID no valido'),

    body('nameProduct')
        .notEmpty().withMessage('El nombre de la categoria no puede ir vacio'),
    body('description')
        .notEmpty().withMessage('La descripcion no puede ir vacia'),
    body('price')
        .notEmpty().withMessage('El precio no puede ir vacio'),
    body('amountAvailability')
        .notEmpty().withMessage('La cantidad habilitada no puede ir vacia '),
    body('dateCreate')
        .notEmpty().withMessage('La fecha no puede ir vacia'),

    handleInputErrors,
    ProductsController.updateProducts
)

router.delete('/:categoryId/products/:productsId', 

    param('productsId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProductsController.deleteProducts
)





export default router