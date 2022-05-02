import { Sequelize } from "sequelize-typescript"
import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto"
import FindProductUseCase from "./find.product.usecase"

describe("Unit test find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });


    it("Should find a product", async () => {
        const productRepository = new ProductRepository()
        const usecase = new FindProductUseCase(productRepository)
    
        const product = ProductFactory.create("a", "Product A", 15)
        productRepository.create(product)

        const input: InputFindProductDto = {
            id: product.id
        }

        const output: OutputFindProductDto = {
            id: product.id,
            name: "Product A",
            price: 15
        }

        const result = await usecase.execute(input)

        expect(result).toEqual(output)
    })
})