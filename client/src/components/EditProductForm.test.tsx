import EditProductForm from "./EditProductForm";
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';

it("updates input fields for edit product form when user types", async () => {
  const mockProduct = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  }
  render(<EditProductForm 
          product={mockProduct}
          onHideEditForm={vi.fn()}
          onEdit={vi.fn()}
        />)
  const user = userEvent.setup()

  // populate fields with current product
  expect(screen.getByRole('textbox', {name: 'Product Name'})).toHaveValue('Amazon Kindle E-reader')
  expect(screen.getByLabelText(/Product Price/i)).toHaveValue(79.99)
  expect(screen.getByLabelText(/Product Quantity/i)).toHaveValue(5)

  // updates to input fields
  const productNameInput = screen.getByRole('textbox', {name: 'Product Name'})
  await user.clear(productNameInput)
  await user.type(productNameInput, 'Fire Tablet')
  expect(screen.getByRole('textbox', {name: 'Product Name'})).toHaveValue('Fire Tablet')

  const productPriceInput = screen.getByLabelText(/Product Price/i)
  await user.clear(productPriceInput)
  await user.type(productPriceInput, '49.99')
  expect(screen.getByLabelText(/Product Price/i)).toHaveValue(49.99)

  const productQuantityInput = screen.getByLabelText(/Product Quantity/i)
  await user.clear(productQuantityInput)
  await user.type(productQuantityInput, '20')
  expect(screen.getByLabelText(/Product Quantity/i)).toHaveValue(20)
})