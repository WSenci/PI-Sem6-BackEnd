import { Router } from 'express'
import ProductController from '../controllers/product-controller'

const productRoutes = Router()

productRoutes.get('/', ProductController.getProductList)

productRoutes.get('/:id', ProductController.getProductById)

//productRoutes.get('/pending', ProductController.getNoDoneProducts)

//productRoutes.get('/unpaid/:cod_comanda', ProductController.getUnpaidProducts)

//productRoutes.get('/date/:data_pedido', ProductController.getProductByData)

//productRoutes.get('/date/:data_pedido/cmd/:cod_comanda', ProductController.getProductsByDataAndCommand)

//productRoutes.get('/cmd/:cod_comanda', ProductController.getProductByCommand)

productRoutes.post('/', ProductController.createProduct)

productRoutes.put('/:id',ProductController.updateProduct)

productRoutes.delete('/:id', ProductController.removeProduct)



export default productRoutes