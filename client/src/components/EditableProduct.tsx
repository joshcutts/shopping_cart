import { useState } from 'react'
import type { Product, NewProduct } from "../types/types";
import EditProductForm from './EditProductForm';
import ProductDetails from './ProductDetails';

interface EditableProductProps {
  product: Product;
  onDelete: (productId: string) => Promise<void>;
  onAddToCart: (productId: string) => Promise<void>;
  onEdit: (productId: string, updatedProduct: NewProduct) => void

}

const EditableProduct = ({ product, onDelete, onAddToCart, onEdit }: EditableProductProps) => {
  const [displayEdit, setDisplayEdit] = useState(false)

  const handleHideEditProduct = () => {
    setDisplayEdit(false)
  }

  const handleShowEditProduct = () => {
    setDisplayEdit(true)
  }

  return (
    <li className="product">
      <ProductDetails
        product={product}
        onEdit={handleShowEditProduct}
        onDelete={onDelete}
        onAddToCart={onAddToCart}
      />
      {displayEdit && <EditProductForm product={product} onHideEditForm={handleHideEditProduct} onEdit={onEdit}/>}
    </li>
  )
}

export default EditableProduct