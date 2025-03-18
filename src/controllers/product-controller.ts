import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../server'

export default class ProductController {
  static async getProductList(req: Request, res: Response) {
    try {
      const database = await connectToDatabase()
      const collection = database.collection('Produto')
      const produtos = await collection.find({}).toArray()
      res.status(200).json(produtos)
    } catch (error) {
      console.error('Erro ao buscar dados da coleção produto', error)
      res.status(500).json({ error: 'Erro ao buscar dados da coleção produto' })
    }
  }

  static async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const database = await connectToDatabase();
      const collection = database.collection('Produto')
      const produto = await collection.findOne({ _id: new ObjectId(id) })
      if (produto) {
        res.status(200).json(produto)
      } else {
        res.status(404).json({ error: "Produto não encontrado." })
      }
    } catch (error) {
      console.error('Erro ao buscar dados na coleção Produtos:', error)
      res.status(500).json({ error: 'Erro ao buscar dados na coleção Produtos' })
    }
  }
  
 /* static async getNoDoneProducts(req: Request, res: Response) {
    try {
      const database = await connectToDatabase()
      const collection = database.collection('Produto')
      const produtos = await collection.find({entregue: false}).toArray()
      res.status(200).json(produtos)
    } catch (error) {
      console.error('Erro ao buscar produtos pendentes:', error)
      res.status(500).json({ error: 'Erro ao buscar produtos pendentes' })
    }
  }
  
  static async getUnpaidProducts(req: Request, res: Response) {
    try {
      const database = await connectToDatabase()
      const collection = database.collection('Produto')
      const {cod_comanda} = req.params
      const produtos = await collection.find({pago: false, cod_comanda: cod_comanda}).toArray()

      res.status(200).json(produtos)
    } catch (error) {
      console.error('Erro ao buscar produtos não pagos:', error)
      res.status(500).json({ error: 'Erro ao buscar produtos não pagos' })
    }
  }*/

  static async createProduct(req: Request, res: Response) {
    try {
      const { nome, preco, tipo, desc, img } = req.body
      const newProduct = {
        nome,
        preco,
        tipo,
        desc,
        img,
      }

      const database = await connectToDatabase();
      const collection = database.collection('Produto')
      const result = await collection.insertOne(newProduct)

      res.status(201).json({ _id: result.insertedId, ...newProduct })
    } catch (error) {
      console.error('Erro ao criar novo produto.', error)
      res.status(500).json({ error: 'Erro ao criar novo produto.' })
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { nome, preco, tipo, desc, img } = req.body
      const updatedData = {
        nome,
        preco,
        tipo,
        desc,
        img,
      }

      const database = await connectToDatabase();
      const collection = database.collection('Produto')
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      )

      if (result.matchedCount > 0) {
        res.status(200).json({ message: 'Produto atualizado com sucesso' })
      } else {
        res.status(400).json({ error: 'Produto não encontrado' })
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error)
      res.status(500).json({ error: 'Erro ao atualizar produto' })
    }
  }

  static async removeProduct(req: Request, res: Response) {
    try {
      const { id } = req.params
      const database = await connectToDatabase()
      const collection = database.collection('Produto')
      const result = await collection.deleteOne({ _id: new ObjectId(id) })

      if (result.deletedCount > 0) {
        res.status(200).json({ message: 'Produto removido com successo.' })
      } else {
        res.status(404).json({ error: 'Produto não encontrado.' })
      }
    } catch (error) {
      console.error('Erro ao remover produto: ', error)
      res.status(500).json({ error: 'Erro ao remover produto' })
    }
  }

  /*static async getProductByData(req: Request, res: Response) {
    try {
      const database = await connectToDatabase()
      const collection = database.collection('Produto')
      const {data_produto} = req.params
      const dayStart = new Date(`${data_produto}T00:00:00.000Z`)
      const dayEnd = new Date(`${data_produto}T23:59:59.999Z`)

      //console.log(data_pedido)
      const produtos = await collection.find(
        {data_produto: 
          {
            $gte: dayStart,
            $lte: dayEnd
          }
        }).toArray()

      res.status(200).json(produtos)
    } catch (error) {
      console.error('Erro ao buscar produtos não pagos por comandas:', error)
      res.status(500).json({ error: 'Erro ao buscar produtos não pagos por comandas' })
    }
  }

  static async getProductByCommand(req: Request, res: Response) {
    try {
      const database = await connectToDatabase()
      const collection = database.collection('Produto')
      const {cod_comanda} = req.params

      //console.log(cod_comanda)
      const produtos = await collection.find({ cod_comanda: Number(cod_comanda) }).toArray()

      res.status(200).json(produtos)
    } catch (error) {
      console.error('Erro ao buscar produtos não pagos por comandas:', error)
      res.status(500).json({ error: 'Erro ao buscar produtos não pagos por comandas' })
    }
  }

  static async getProductsByDataAndCommand(req: Request, res: Response) {
    try {
      const database = await connectToDatabase()
      const collection = database.collection('Produto')
      const {data_produto, cod_comanda} = req.params
      const dayStart = new Date(`${data_produto}T00:00:00.000Z`)
      const dayEnd = new Date(`${data_produto}T23:59:59.999Z`)

      //console.log(cod_comanda)
      //console.log(data_pedido)
      const produtos = await collection.find(
        { cod_comanda: Number(cod_comanda),
          data_produto: 
          {
            $gte: dayStart,
            $lte: dayEnd
          }
        }).toArray()

      res.status(200).json(produtos)
    } catch (error) {
      console.error('Erro ao buscar produtos não pagos por comandas:', error)
      res.status(500).json({ error: 'Erro ao buscar produtos não pagos por comandas' })
    }
  } */
}