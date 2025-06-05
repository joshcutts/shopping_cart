import type { Product } from "../types/types";

interface ProductDetailsProps {
  product: Product;
  onDelete: (productId: string) => Promise<void>;
  onEdit: () => void
  onAddToCart: (productId: string) => Promise<void>
}

const ProductDetails = ({ product, onDelete, onEdit, onAddToCart }: ProductDetailsProps) => {
  const { title, price, quantity } = product

  const handleDelete = () => {
    onDelete(product._id)
  }

  const handleAddToCart = () => {
    onAddToCart(product._id)
  }

  return (
    <div className="product-details">
      <h3>{title}</h3>
      <p className="price">${price}</p>
      <p className="quantity">{quantity} left in stock</p>
      <div className="actions product-actions">
        <button className="add-to-cart" disabled={quantity === 0} onClick={handleAddToCart}>Add to Cart</button>
        <button className="edit" onClick={() => onEdit()}>Edit</button>
      </div>
      <button className="delete-button" onClick={handleDelete}><span>X</span></button>
    </div>      
  )
}

export default ProductDetails