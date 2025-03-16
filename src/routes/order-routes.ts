import { Router } from 'express'
import OrderController from '../controllers/order-controller'

const orderRoutes = Router()

orderRoutes.get('/', OrderController.getOrderList)

orderRoutes.get('/:id', OrderController.getOrderById)

orderRoutes.post('/', OrderController.createOrder)

orderRoutes.put('/:id',OrderController.updateOrder)

orderRoutes.delete('/:id', OrderController.removeOrder)

export default orderRoutes