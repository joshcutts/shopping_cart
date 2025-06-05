import { useState } from 'react'
import type { NewProduct } from "../types/types";
import AddProductForm from "./AddProductForm"
import AddFormButton from "./AddFormButton"

interface ToggleableProductFormProps {
  onSubmit: (newProduct: NewProduct, callback?: () => void) => Promise<void>
}

const ToggleableProductForm = ({ onSubmit }: ToggleableProductFormProps)  => {
  const [isAddProductFormShown, setIsAffProductFormShown] = useState(false)

  const toggleAddProductForm = () => {
    setIsAffProductFormShown(!isAddProductFormShown)
  }

  return (
    <>
    {isAddProductFormShown ?
      <AddProductForm
        onCancel={toggleAddProductForm}
        onSubmit={onSubmit}
        toggleForm={toggleAddProductForm}
      /> : 
      <AddFormButton onClick={toggleAddProductForm}/>
    }
    </>
  )
}

export default ToggleableProductForm