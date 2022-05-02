import ProductFactory from "../../../domain/product/factory/product.factory"
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto"
import FindProductUseCase from "./find.product.usecase"

const productB = ProductFactory.create("b", "Product B", 15)
const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(productB)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
  }
  
describe("Unit Test find product use case", () => {

    it("Should find a product", async () => {
        const productRepository = MockRepository()
        const usecase = new FindProductUseCase(productRepository)

        const input: InputFindProductDto = {
            id: productB.id
        }

        const output: OutputFindProductDto = {
            id: productB.id,
            name: "Product B",
            price: 30
        }

        const result = await usecase.execute(input)

        expect(result).toEqual(output)
    })
})