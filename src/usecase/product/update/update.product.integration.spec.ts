import { Sequelize } from "sequelize-typescript"
import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { InputUpdateProductDto } from "./update.product.dto"
import UpdateProductUseCase from "./update.product.usecase"

describe("Integration test for product update use case", () => {
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

    it("Should update a product", async () => {
        const productRepository = new ProductRepository()
        const usecase = new UpdateProductUseCase(productRepository)

        const product = ProductFactory.create('a', "Product A", 10)
        productRepository.create(product)

        const input: InputUpdateProductDto = {
            id: product.id,
            name: "Product Updated",
            price: 25
        }

        const output = await usecase.execute(input)

        expect(output).toEqual(input)
    })
})
