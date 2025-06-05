import type { Product, NewProduct } from "../types/types";
import EditableProduct from "./EditableProduct";

interface ProductsListingProps {
  products: Product[];
  onDelete: (productId: string) => Promise<void>;
  onAddToCart: (productId: string) => Promise<void>;
  onEdit: (productId: string, updatedProduct: NewProduct) => void
}

const ProductsListing = ({
  products,
  onDelete,
  onAddToCart,
  onEdit
}: ProductsListingProps) => {
  return (
    <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
          {products.map(p => {
            return <EditableProduct
                    key={p._id}
                    product={p}
                    onDelete={onDelete}
                    onAddToCart={onAddToCart}
                    onEdit={onEdit}
                  />
            }
          )}
        </ul>
      </div>
  )
}

export default ProductsListing