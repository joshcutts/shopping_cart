import ProductsListing from "./ProductsListing";
import { render, screen } from "@testing-library/react"
import { mockProducts } from "../mockData/data";

it('ProductsListing component renders correctly', () => {
  render(<ProductsListing 
          products={mockProducts}
          onDelete={vi.fn()}
          onAddToCart={vi.fn()}
          onEdit={vi.fn()}
          />)

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Products')
})