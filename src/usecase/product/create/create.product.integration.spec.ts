import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

describe("Integration test create product usecase", () => {
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

  it("Should create a product", async () => {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const input: InputCreateProductDto = {
        type: "a",
        name: "Product A",
        price: 10
    }        

    const output: OutputCreateProductDto = {
        id: expect.any(String),
        name: input.name,
        price: input.price
    }

    const result = await usecase.execute(input)
    expect(result).toEqual(output)
  })

  it("Should throw on error when name is missing", async () => {
      const productRepository = new ProductRepository()
      const usecase = new CreateProductUseCase(productRepository)
      const input: InputCreateProductDto = {
          type: "a",
          name: "",
          price: 10
      }

      expect(() =>usecase.execute(input)).rejects.toThrow("Name is required")
  })

  it("Should throw on error when price is not greater than zero", async () => {
      const productRepository = new ProductRepository()
      const usecase = new CreateProductUseCase(productRepository)
      const input: InputCreateProductDto = {
          type: "a",
          name: "Product A",
          price: -1
      }        

      expect(() => usecase.execute(input)).rejects.toThrow("Price must be greater than zero")
  })

})