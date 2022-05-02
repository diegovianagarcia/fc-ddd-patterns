import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const product = ProductFactory.create('a', "Product A", 10)

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }    
}

describe("Unit test create product usecase", () => {

    it("Should create a product", async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateProductUseCase(customerRepository)

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
        const customerRepository = MockRepository();
        const usecase = new CreateProductUseCase(customerRepository)
        const input: InputCreateProductDto = {
            type: "a",
            name: "",
            price: 10
        }

        expect(() =>usecase.execute(input)).rejects.toThrow("Name is required")
    })

    it("Should throw on error when price is not greater than zero", async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateProductUseCase(customerRepository)
        const input: InputCreateProductDto = {
            type: "a",
            name: "Product A",
            price: -1
        }        

        expect(() => usecase.execute(input)).rejects.toThrow("Price must be greater than zero")
    })

   
})