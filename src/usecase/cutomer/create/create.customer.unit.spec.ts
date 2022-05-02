import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import CreateCustomerUseCase from "./create.customer.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create customer usecase", () => {
    let input: InputCreateCustomerDto

    beforeEach(async () => {
        input = {
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "Zip"
            }
        }        
    })

    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const useCase = new CreateCustomerUseCase(customerRepository)

        const output: OutputCreateCustomerDto = {
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            }
        }

        const result = await useCase.execute(input)
        expect(result).toEqual(output)
    })

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const useCase = new CreateCustomerUseCase(customerRepository)
        input.name = ""

        expect(() => useCase.execute(input)).rejects
            .toThrow("Name is required")
    })

    it("should throw an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const useCase = new CreateCustomerUseCase(customerRepository)
        input.address.street = ""

        expect(() => useCase.execute(input)).rejects
            .toThrow("Street is required")
    })    

})