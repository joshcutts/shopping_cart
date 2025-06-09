import { useState } from 'react'
import type { Product, NewProduct } from "../types/types";

interface EditProductFormProps {
  product: Product;
  onHideEditForm: () => void;
  onEdit: (productId: string, updatedProduct: NewProduct) => void

}

const EditProductForm = ({ product, onHideEditForm, onEdit }: EditProductFormProps) => {
  const {title, price, quantity} = product
  const [formData, setFormData] = useState({
    title,
    price,
    quantity
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.id.split('-')[1];
    if (name === 'name') name = 'title'

    setFormData(prev => ({
      ...prev,
      [name]: e.target.value
    }));
  }

  const handleEdit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onEdit(product._id, {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity)
    })
    onHideEditForm()
  }

  return (
    <div className="edit-form">
              <h3>Edit Product</h3>
              <form onSubmit={handleEdit} aria-label="edit-product-form">
                <div className="input-group">
                  <label htmlFor="product-name">Product Name:</label>
                  <input
                    type="text"
                    id="product-name"
                    value={formData.title || ''}
                    aria-label="Product Name"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="product-price">Price:</label>
                  <input
                    type="number"
                    id="product-price"
                    value={formData.price || ''}
                    aria-label="Product Price"
                    min="0.01"
                    step="0.01"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="product-quantity">Quantity:</label>
                  <input
                    type="number"
                    id="product-quantity"
                    value={formData.quantity || '0'}
                    aria-label="Product Quantity"
                    min="0"
                    step="1"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="actions form-actions">
                  <button type="submit">Update</button>
                  <button type="button" onClick={() => onHideEditForm()}>Cancel</button>
                </div>
              </form>
            </div>
  )
}

export default EditProductForm