import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { CategoryController } from "../controllers/CategoryController";

const router = Router()

router.post('/', 

    body('nameCategory')
        .notEmpty().withMessage('El nombre de la categoria no puede ir vacio'),
         
    handleInputErrors,        
    CategoryController.createCategories
)


router.get('/', CategoryController.getAllCategory)

router.get('/:id', 

    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    CategoryController.getCategoryById
)

router.put('/:id', 

    param('id').isMongoId().withMessage('ID no valido'),
    body('nameCategory')
        .notEmpty().withMessage('El nombre de la categoria no puede ir vacio'),

    handleInputErrors,
    CategoryController.updateCategory
)

router.delete('/:id', 

    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    CategoryController.deleteCategory
)


export default router