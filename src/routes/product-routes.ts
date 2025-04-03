import { Router } from 'express'
import ProductController from '../controllers/product-controller'

const productRoutes = Router()

productRoutes.get('/', ProductController.getProductList)

productRoutes.get('/:id', ProductController.getProductById)

productRoutes.post('/', ProductController.createProduct)

productRoutes.put('/:id',ProductController.updateProduct)

productRoutes.delete('/:id', ProductController.removeProduct)



export default productRoutes