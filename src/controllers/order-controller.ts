import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../server'

export default class OrderController {
  static async getOrderList(req: Request, res: Response) {
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

  static async getOrderById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const database = await connectToDatabase();
      const collection = database.collection('Pedido')
      const pedido = await collection.findOne({ _id: new ObjectId(id) })
      if (pedido) {
        res.status(200).json(pedido)
      } else {
        res.status(404).json({ error: "Pedido não encontrado." })
      }
    } catch (error) {
      console.error('Erro ao buscar dados na coleção Pedidos:', error)
      res.status(500).json({ error: 'Erro ao buscar dados na coleção Pedidos' })
    }
  }
  
  static async getNoDoneOrders(req: Request, res: Response) {
    try {
      const database = await connectToDatabase()
      const collection = database.collection('Pedido')
      const pedidos = await collection.find({entregue: false}).sort({data_pedido: 1}).toArray()
      res.status(200).json(pedidos)
    } catch (error) {
      console.error('Erro ao buscar pedidos pendentes:', error)
      res.status(500).json({ error: 'Erro ao buscar pedidos pendentes' })
    }
  }
  
  static async getUnpaidOrders(req: Request, res: Response) {
    try {
      const database = await connectToDatabase()
      const collection = database.collection('Pedido')
      const {cod_comanda} = req.params
      const pedidos = await collection.find({pago: false, cod_comanda: cod_comanda}).toArray()

      res.status(200).json(pedidos)
    } catch (error) {
      console.error('Erro ao buscar pedidos não pagos por comandas:', error)
      res.status(500).json({ error: 'Erro ao buscar pedidos não pagos por comandas' })
    }
  }

  static async createOrder(req: Request, res: Response) {
    try {
      const { cod_mesa, cod_comanda, produtos, data_pedido, entregue, pago, total } = req.body
      const newOrder = {
        cod_mesa,
        cod_comanda,
        produtos,
        data_pedido,
        entregue,
        pago,
        total,
      }

      const database = await connectToDatabase();
      const collection = database.collection('Pedido')
      const result = await collection.insertOne(newOrder)

      res.status(201).json({ _id: result.insertedId, ...newOrder })
    } catch (error) {
      console.error('Erro ao criar novo pedido.', error)
      res.status(500).json({ error: 'Erro ao criar novo pedido.' })
    }
  }

  static async updateOrder(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { cod_mesa, cod_comanda, produtos, data_pedido, entregue, pago, total } = req.body
      const updatedData = {
        cod_mesa,
        cod_comanda,
        produtos,
        data_pedido,
        entregue,
        pago,
        total,
      }

      const database = await connectToDatabase();
      const collection = database.collection('Pedido')
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      )

      if (result.matchedCount > 0) {
        res.status(200).json({ message: 'Pedido atualizado com sucesso' })
      } else {
        res.status(400).json({ error: 'Pedido não encontrado' })
      }
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error)
      res.status(500).json({ error: 'Erro ao atializar pedido' })
    }
  }

  static async removeOrder(req: Request, res: Response) {
    try {
      const { id } = req.params
      const database = await connectToDatabase()
      const collection = database.collection('Pedido')
      const result = await collection.deleteOne({ _id: new ObjectId(id) })

      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Pedido removido com successo.' })
      } else {
        res.status(404).json({ error: 'Pedido não encontrado.' })
      }
    } catch (error) {
      console.error('Erro ao remover pedido: ', error)
      res.status(500).json({ error: 'Erro ao remover pedido' })
    }
  }

  static async getOrderByData(req: Request, res: Response) {
    try {
      const database = await connectToDatabase()
      const collection = database.collection('Pedido')
      const {data_pedido} = req.params
      const dayStart = new Date(`${data_pedido}T00:00:00.000Z`)
      const dayEnd = new Date(`${data_pedido}T23:59:59.999Z`)

      //console.log(data_pedido)
      const pedidos = await collection.find(
        {data_pedido: 
          {
            $gte: dayStart,
            $lte: dayEnd
          }
        }).toArray()

      res.status(200).json(pedidos)
    } catch (error) {
      console.error('Erro ao buscar pedidos não pagos por comandas:', error)
      res.status(500).json({ error: 'Erro ao buscar pedidos não pagos por comandas' })
    }
  }

  static async getOrderByCommand(req: Request, res: Response) {
    try {
      const database = await connectToDatabase()
      const collection = database.collection('Pedido')
      const {cod_comanda} = req.params

      //console.log(cod_comanda)
      const pedidos = await collection.find({ pago: false, cod_comanda: Number(cod_comanda) }).toArray()

      res.status(200).json(pedidos)
    } catch (error) {
      console.error('Erro ao buscar pedidos não pagos por comandas:', error)
      res.status(500).json({ error: 'Erro ao buscar pedidos não pagos por comandas' })
    }
  }

  static async getOrderByDataAndCommand(req: Request, res: Response) {
    try {
      const database = await connectToDatabase()
      const collection = database.collection('Pedido')
      const {data_pedido, cod_comanda} = req.params
      const dayStart = new Date(`${data_pedido}T00:00:00.000Z`)
      const dayEnd = new Date(`${data_pedido}T23:59:59.999Z`)

      //console.log(cod_comanda)
      //console.log(data_pedido)
      const pedidos = await collection.find(
        { cod_comanda: Number(cod_comanda),
          data_pedido: 
          {
            $gte: dayStart,
            $lte: dayEnd
          }
        }).toArray()

      res.status(200).json(pedidos)
    } catch (error) {
      console.error('Erro ao buscar pedidos não pagos por comandas:', error)
      res.status(500).json({ error: 'Erro ao buscar pedidos não pagos por comandas' })
    }
  }
}