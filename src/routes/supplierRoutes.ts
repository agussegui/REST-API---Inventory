import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import {SupplierController} from "../controllers/SupplierController"

const router = Router()


router.post('/', 

    body('nameSupplier')
        .notEmpty().withMessage('El nombre del proeevedor no puede ir vacio'),
    body('email')
        .notEmpty().withMessage('El Email no puede ir vacio'),    
    body('address')
        .notEmpty().withMessage('La Direccion no puede ir vacia'),      
    body('numberPhone')
        .notEmpty().withMessage('El numero de telefono no puede ir vacio')  
        .isLength({ max: 13 }).withMessage('El número de teléfono no puede tener más de 12 caracteres'),
         
    handleInputErrors,        
    SupplierController.createSupplier
)

router.get('/',SupplierController.getAllSupplier)

router.get('/:id', 

    param('supplierId').isMongoId().withMessage('ID no valido'),
    SupplierController.getSupplierById
)

router.put('/:id', 

    param('id').isMongoId().withMessage('ID no valido'),
    body('nameSupplier')
        .notEmpty().withMessage('El nombre del proeevedor no puede ir vacio'),
    body('email')
        .notEmpty().withMessage('El Email no puede ir vacio'),    
    body('address')
        .notEmpty().withMessage('La Direccion no puede ir vacia'),      
    body('numberPhone')
        .notEmpty().withMessage('El numero de telefono no puede ir vacio')  
        .isLength({ max: 13 }).withMessage('El número de teléfono no puede tener más de 12 caracteres'),
    handleInputErrors,
    SupplierController.updateSupplier
)

router.delete('/:id', 

    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    SupplierController.deleteSupplier
)

export default router