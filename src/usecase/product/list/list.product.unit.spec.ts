import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const productA = ProductFactory.create('a', "Product A", 10)

const productB = ProductFactory.create('b', "Product B", 15)

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
    }
}

describe("Unit test for listing product use case", () => {

    it("Should list a product", async () => {
        const repository = MockRepository()
        const useCase = new ListProductUseCase(repository)

        const output = await useCase.execute({})

        expect(output.products.length).toBe(2)
        expect(output.products[0].name).toBe("Product A")
        expect(output.products[0].price).toBe(10)

        expect(output.products[1].name).toBe("Product B")
        expect(output.products[1].price).toBe(30)
    })
})
