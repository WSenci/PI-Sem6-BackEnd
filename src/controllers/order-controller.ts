import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../server'

export default class OrderController {
    static async getOrderList(req: Request, res: Response){
        try {
            const database = await connectToDatabase()
            const collection = database.collection('Pedido')
            const pedidos = await collection.find({}).toArray()
            res.status(200).json(pedidos)
          } catch (error) {
            console.error('Erro ao buscar dados da coleção pedido', error)
            res.status(500).json({ error: 'Erro ao buscar dados da coleção pedido' })
          }
    }

}