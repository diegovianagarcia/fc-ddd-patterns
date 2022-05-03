import express, {Request, Response} from "express"
import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto"
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase"
import { InputFindProductDto } from "../../../usecase/product/find/find.product.dto"
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase"
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase"
import { InputUpdateProductDto } from "../../../usecase/product/update/update.product.dto"
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase"
import ProductRepository from "../../product/repository/sequelize/product.repository"

export const productRoute = express.Router()

productRoute.post("/", async (req: Request, res: Response ) => {
  const usecase = new CreateProductUseCase(new ProductRepository)
  try {
    const productDto: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price,
      type: req.body.type
    }
    const output = await usecase.execute(productDto)
    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

productRoute.get("/",async (req:  Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository)
  try {
    const output = await usecase.execute({})
    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  } 
})

productRoute.put("/", async (req: Request, res: Response ) => {
  const usecase = new UpdateProductUseCase(new ProductRepository)
  try {
    const productDto: InputUpdateProductDto = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    }
    const output = await usecase.execute(productDto)
    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

productRoute.get("/:productId",async (req:  Request, res: Response) => {
  const usecase = new FindProductUseCase(new ProductRepository)
  try {
    const productDto: InputFindProductDto = {
      id: req.params.productId
    }
    const output = await usecase.execute(productDto)
    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  } 
})
