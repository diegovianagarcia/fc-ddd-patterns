import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    
    constructor(private customerRepository: CustomerRepositoryInterface){}

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customerList = await this.customerRepository.findAll()

        return OutputMapper.toOutput(customerList)
    }
}

class OutputMapper {
    static toOutput(customers: Customer[]): OutputListCustomerDto {
        return {
            customers: customers.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                    city: customer.Address.city,
                }
            }))
        }
    }
}