import App from "../App";
import {render, screen } from "@testing-library/react"
import {it, expect} from "vitest"
import userEvent from '@testing-library/user-event';

it("Add product button click displays form, clicking cancel displays button removes form", async () => {
  render(<App />)
  const user = userEvent.setup()

  // not initially visible
  expect(screen.queryByRole('form', {name: 'add-product-form'})).not.toBeInTheDocument();

  // visible on click
  const addButton = screen.getByRole('button', {name: /Add A Product/i})
  await user.click(addButton)

  expect(screen.getByRole('form', {name: 'add-product-form'})).toBeInTheDocument();

  // click cancel to hide form
  const cancelButton = screen.getByRole('button', {name: /Cancel/i})
  await user.click(cancelButton)
  expect(screen.queryByRole('form', {name: 'add-product-form'})).not.toBeInTheDocument();
})