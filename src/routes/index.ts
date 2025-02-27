import { Router } from 'express'

import protuctRoutes from './product-routes'

const routes = Router()

routes.use('/product', protuctRoutes)

export default routes

