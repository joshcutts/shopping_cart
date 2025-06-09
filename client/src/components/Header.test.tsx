import Header from "./Header";
import { render, screen } from "@testing-library/react"

it('Header component renders correctly', () => {
  const mockCart = [
    {
      _id: "a1",
      productId: "1",
      title: "Amazon Kindle E-reader",
      quantity: 1,
      price: 79.99,
    },
    {
      _id: "a2",
      productId: "2",
      title: "Apple 10.5-Inch iPad Pro",
      quantity: 3,
      price: 649.99,
    },
  ];
  render(<Header cart={mockCart} onCheckout={vi.fn()}/>)

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The Shop!');
})