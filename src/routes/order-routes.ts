import { Router } from 'express'
import ProductController from '../controllers/product-controller'
import OrderController from '../controllers/order-controller'

const orderRoutes = Router()

orderRoutes.get('/', OrderController.getOrderList)

export default orderRoutes