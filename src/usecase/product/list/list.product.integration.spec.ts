import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test for listing product use case", () => {
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

    it("Should list a product", async () => {
        const productRepository = new ProductRepository()
        const useCase = new ListProductUseCase(productRepository)

        const productA = ProductFactory.create('a', "Product A", 10)
        productRepository.create(productA)
        const productB = ProductFactory.create('b', "Product B", 15)
        productRepository.create(productB)

        const output = await useCase.execute({})

        expect(output.products.length).toBe(2)
        expect(output.products[0].name).toBe("Product A")
        expect(output.products[0].price).toBe(10)

        expect(output.products[1].name).toBe("Product B")
        expect(output.products[1].price).toBe(30)
    })
})
