import AddProductForm from "./AddProductForm";
import { screen, render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'

it('updates input fields for add product form when user types', async () => {
  render(<AddProductForm 
          onCancel={vi.fn()}
          onSubmit={vi.fn()}
          toggleForm={vi.fn()}
        />)
  const user = userEvent.setup()
  
  // empty fields before entering text
  expect(screen.getByRole('textbox', {name: 'Product Name'})).toHaveValue('')
  expect(screen.getByLabelText(/Product Price/i)).toHaveValue(null)
  expect(screen.getByLabelText(/Product Quantity/i)).toHaveValue(null)

  // adding text
  const productNameInput = screen.getByRole('textbox', {name: 'Product Name'})
  await user.type(productNameInput, 'Fire Tablet')
  expect(screen.getByRole('textbox', {name: 'Product Name'})).toHaveValue('Fire Tablet')

  const productPriceInput = screen.getByLabelText(/Product Price/i)
  await user.type(productPriceInput, '49.99')
  expect(screen.getByLabelText(/Product Price/i)).toHaveValue(49.99)

  const productQuantityInput = screen.getByLabelText(/Product Quantity/i)
  await user.type(productQuantityInput, '20')
  expect(screen.getByLabelText(/Product Quantity/i)).toHaveValue(20)})