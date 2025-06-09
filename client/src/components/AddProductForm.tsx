import { useState } from 'react'
import type { NewProduct } from "../types/types.ts"

interface AddProductFormProps {
  onCancel: () => void
  onSubmit: (newProduct: NewProduct, callback?: () => void) => Promise<void>
  toggleForm: () => void;
}

interface FormData {
  title: string;
  price: string;
  quantity: string;
}

const AddProductForm = ({ onCancel, onSubmit, toggleForm }: AddProductFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: '',
    quantity: ''
  })

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      quantity: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name.split('-')[1];
    if (name === 'name') name = 'title'

    setFormData(prev => ({
      ...prev,
      [name]: e.target.value
    }));
  }

  const handleSubmit = (e: React.SyntheticEvent, callback?) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity)
    } as NewProduct, resetForm)
    toggleForm()
  }

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit} aria-label="add-product-form">
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={formData.title}
            aria-label="Product Name"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0.01"
            step="0.01"
            value={formData.price}
            aria-label="Product Price"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            step="1"
            value={formData.quantity}
            aria-label='Product Quantity'
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={() => onCancel()}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddProductForm