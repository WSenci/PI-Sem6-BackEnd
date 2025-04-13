import { Router } from 'express'
import OrderController from '../controllers/order-controller'

const orderRoutes = Router()

orderRoutes.get('/', OrderController.getOrderList)

orderRoutes.get('/order/:id', OrderController.getOrderById)

orderRoutes.get('/pending', OrderController.getNoDoneOrders)

orderRoutes.get('/unpaid/:cod_comanda', OrderController.getUnpaidOrders)

orderRoutes.get('/date/:data_pedido', OrderController.getOrderByData)

orderRoutes.get('/date/:data_pedido/cmd/:cod_comanda', OrderController.getOrderByDataAndCommand)

orderRoutes.get('/cmd/:cod_comanda', OrderController.getOrderByCommand)

orderRoutes.post('/', OrderController.createOrder)

orderRoutes.put('/:id',OrderController.updateOrder)

orderRoutes.delete('/:id', OrderController.removeOrder)



export default orderRoutes