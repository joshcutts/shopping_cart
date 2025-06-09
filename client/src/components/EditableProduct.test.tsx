import EditableProduct from "./EditableProduct";
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';

it("Add product button click displays form, clicking cancel displays button removes form", async () => {
  const mockProduct = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  }
  render(<EditableProduct 
          product={mockProduct}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onAddToCart={vi.fn()}
        />)
  const user = userEvent.setup()

  // not initially visible
  expect(screen.queryByRole('form', {name: 'edit-product-form'})).not.toBeInTheDocument();

  // visible on click
  const editButton = screen.getByRole('button', {name: /Edit/i})
  await user.click(editButton)

  expect(screen.getByRole('form', {name: 'edit-product-form'})).toBeInTheDocument();
  
  // click cancel to hide form
  const cancelButton = screen.getByRole('button', {name: /Cancel/i})
  await user.click(cancelButton)
  expect(screen.queryByRole('form', {name: 'edit-product-form'})).not.toBeInTheDocument();
})