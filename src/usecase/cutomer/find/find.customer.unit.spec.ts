import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Street", 123, "Zip", "City");
customer.Address = address;

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test find customer use case", () => {

  it("Should find a customer",async () => {
      const customerRepository = MockRepository()
      const usecase = new FindCustomerUseCase(customerRepository)
      
      const input: InputFindCustomerDto = {
          id: "123"
      }

      const output: OutputFindCustomerDto = {
          id: "123",
          name: "John",
          address: {
              street: "Street",
              city: "City",
              number: 123,
              zip: "Zip"
          }
      }

      const result = await usecase.execute(input)

      expect(result).toEqual(output)
  })

  it("Should not find a customer",async () => {
    const customerRepository = MockRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found")
    })
    const usecase = new FindCustomerUseCase(customerRepository)
    
    const input: InputFindCustomerDto = {
        id: "123"
    }

    const result = 

    expect(() => usecase.execute(input)).rejects.toThrow("Customer not found")
  })
})