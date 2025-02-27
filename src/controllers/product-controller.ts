import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../server'

export default class ProductController {
    static async getProductList(req: Request, res: Response){
        try {
            const database = await connectToDatabase()
            const collection = database.collection('Produto')
            const users = await collection.find({}).toArray()
            res.status(200).json(users)
          } catch (error) {
            console.error('Erro ao buscar dados da coleção users:', error)
            res.status(500).json({ error: 'Erro ao buscar dados da coleção users' })
          }
    }

}
