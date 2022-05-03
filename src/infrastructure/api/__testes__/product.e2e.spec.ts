import {app, sequelize} from "../express" 
import request from "supertest"

describe("E2E test for product", () => {

  beforeEach(async () => {
      await sequelize.sync({force: true})
  })

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product A",
        price: 25,
        type: "a"
      })
    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Product A")
    expect(response.body.price).toBe(25)
  })

  it("should not create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product A",
        price: -1,
        type: "a"
      })
    expect(response.status).toBe(500)
  })

  it("should list all product", async () => {
    let response = await request(app)
      .post("/product")
      .send({
        name: "Product A",
        price: 25,
        type: "a"
      })
    expect(response.status).toBe(200)

    response = await request(app)
      .post("/product")
      .send({
        name: "Product B",
        price: 10,
        type: "b"
      })
    expect(response.status).toBe(200)

    const listResponse = await request(app).get("/product").send()
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.products.length).toBe(2)

    const product = listResponse.body.products[0]
    expect(product.name).toBe("Product A")
    expect(product.price).toBe(25)

    const product2 = listResponse.body.products[1]
    expect(product2.name).toBe("Product B")
    expect(product2.price).toBe(20)
  })
})
