import { Router } from 'express'

import protuctRoutes from './product-routes'
import orderRoutes from './order-routes'

const routes = Router()

routes.use('/product', protuctRoutes)
routes.use('/order', orderRoutes)

export default routes

