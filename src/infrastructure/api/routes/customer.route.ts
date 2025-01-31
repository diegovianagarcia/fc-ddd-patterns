import express, {Request, Response} from "express"
import { InputCreateCustomerDto } from "../../../usecase/cutomer/create/create.customer.dto"
import CreateCustomerUseCase from "../../../usecase/cutomer/create/create.customer.usecase"
import ListCustomerUseCase from "../../../usecase/cutomer/list/list.customer.usecase"
import CustomerRepository from "../../customer/repository/sequelize/customer.repository"

export const customerRoute = express.Router()

customerRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository)
    try {
        const customerDto: InputCreateCustomerDto = {
            name: req.body.name,
            address: {
                city: req.body.address.city,
                number: req.body.address.number,
                street: req.body.address.street,
                zip: req.body.address.zip
            }
        }
        const output = await usecase.execute(customerDto)
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})

customerRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository)
    try {
        const output = await usecase.execute({})
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})
