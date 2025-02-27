import { Router } from 'express'
import ProductController from '../controllers/product-controller'

const protuctRoutes = Router()

protuctRoutes.get('/', ProductController.getProductList)

export default protuctRoutes