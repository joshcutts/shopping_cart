import App from "../App";
import { screen, render } from "@testing-library/react"
import { getAllProducts, getCart, editProduct, submitProduct } from "../services/shopping.services";
import { mockProducts, mockCart } from "../mockData/data";
import userEvent from "@testing-library/user-event";

vi.mock("../services/shopping.services")

const mockedGetAllProducts = vi.mocked(getAllProducts)
const mockedGetCart = vi.mocked(getCart)
const mockedEditProduct = vi.mocked(editProduct)
const mockedAddNewProduct = vi.mocked(submitProduct)

afterEach(() => {
  vi.resetAllMocks()
})


it('product is displayed when app renders', async () => {
  mockedGetAllProducts.mockResolvedValue(mockProducts)  
  render(<App />)
  const productOne = await screen.findByRole('heading', {name: /Amazon Kindle E-reader/i})
  expect(productOne).toBeInTheDocument()
})

// it("Throws error when products can't be retrieved", async () => {
//   const errorMessage = 'Failed to fetch products'
//   mockedGetAllProducts.mockRejectedValue(new Error(errorMessage));
//   render(<App />)
  
// })

it('cart item is displayed when app renders and cart is not empty', async () => {
  mockedGetCart.mockResolvedValue(mockCart)
  render(<App />)
  const cartItemOne = await screen.findByRole('cell', {name: /Amazon Kindle E-reader/i})
  expect(cartItemOne).toBeInTheDocument()
})

it('editing a product closes the edit form and updates respective product', async () => {
  const mockProductsOne = [{
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  }]

  const editedProduct = {
    _id: '1',
    title: "Dune",
    quantity: 5,
    price: 29.99,
  }
  const user = userEvent.setup()

  mockedGetAllProducts.mockResolvedValue(mockProductsOne)  
  mockedEditProduct.mockResolvedValue(editedProduct)
  
  render(<App />)

  // open form and edit fields
  const productTitle = await screen.findByRole('heading', {name: /Amazon Kindle E-reader/})
  expect(productTitle).toBeInTheDocument()

  const editButton = await screen.findByRole('button', {name: /Edit/i})
  await user.click(editButton)
  const titleInput = screen.getByLabelText(/Product Name/i)
  const priceInput = screen.getByLabelText(/Product Price/i)

  await user.clear(titleInput)
  await user.type(titleInput, 'Dune')
  await user.clear(priceInput)
  await user.type(priceInput, '29.99')

  const updateButton = await screen.findByRole('button', {name: /Update/i})
  await user.click(updateButton)
  
  const updatedTitle = await screen.findByRole('heading', {name: /Dune/i})
  const updatedPrice = await screen.findByText(/29.99/)

  expect(updatedTitle).toBeInTheDocument()
  expect(updatedPrice).toBeInTheDocument()

  // form closes
  const editProductForm = await screen.queryByRole('heading', {name: /Edit Product/})
  expect(editProductForm).not.toBeInTheDocument()
})

it('adding product closes the form and product appears in products', async () => {
  const mockedReturnedProduct = {
    _id: '1',
    title: "Dune",
    quantity: 5,
    price: 29.99,
  }
  render(<App />)
  const user = userEvent.setup()
  mockedAddNewProduct.mockResolvedValue(mockedReturnedProduct)
  
  // form not initially present
  const addProductForm = screen.queryByLabelText('add-product-form')
  expect(addProductForm).not.toBeInTheDocument()

  const addNewProductButton = screen.getByRole('button', {name: /Add A Product/})
  await user.click(addNewProductButton)

  const addProductFormTwo = screen.queryByLabelText('add-product-form')
  expect(addProductFormTwo).toBeInTheDocument()

  const titleInput = await screen.findByLabelText(/Product Name/)
  const priceInput = await screen.findByLabelText(/Product Price/)
  const quantityInput = await screen.findByLabelText(/Product Quantity/)

  await user.type(titleInput, 'Dune')
  await user.type(priceInput, '29.99')
  await user.type(quantityInput, '5')

  const addButton = await screen.findByRole('button', {name: /Add/i})
  await user.click(addButton)
  screen.debug()
  const updatedTitle = await screen.findByRole('heading', {level: 3})
  const updatedPrice = await screen.findByLabelText(/price/i)
  const updatedQuantity = await screen.findByLabelText(/quantity/i)

  expect(updatedTitle).toHaveTextContent('Dune')
  expect(updatedPrice).toHaveTextContent("29.99")
    expect(updatedQuantity).toHaveTextContent("5")

})