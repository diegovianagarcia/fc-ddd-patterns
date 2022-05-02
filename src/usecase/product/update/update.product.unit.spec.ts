import ProductFactory from "../../../domain/product/factory/product.factory"
import { InputUpdateProductDto } from "./update.product.dto"
import UpdateProductUseCase from "./update.product.usecase"

const product = ProductFactory.create('a', "Product A", 10)

const input: InputUpdateProductDto = {
    id: product.id,
    name: "Product Updated",
    price: 25
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for product update use case", () => {

    it("Should update a product", async () => {
        const productRepository = MockRepository()
        const usecase = new UpdateProductUseCase(productRepository)

        const output = await usecase.execute(input)

        expect(output).toEqual(input)
    })
})
