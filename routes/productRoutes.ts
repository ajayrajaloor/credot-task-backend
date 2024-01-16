import express from 'express'
import productController from '../controller/productController'

const router = express.Router()

router.get('/', productController.getProducts)

router.post('/admin/add-product',productController.addProduct)



export default router;