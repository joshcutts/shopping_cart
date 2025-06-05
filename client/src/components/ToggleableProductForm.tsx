import type { NewProduct } from "../types/types";
import AddProductForm from "./AddProductForm"
import AddFormButton from "./AddFormButton"

interface ToggleableProductFormProps {
  displayAddForm: boolean;
  onCancel: () => void;
  onSubmit: (newProduct: NewProduct, callback?: () => void) => Promise<void>
  onClick: () => void,
}

const ToggleableProductForm = ({ displayAddForm, onCancel, onSubmit, onClick}: ToggleableProductFormProps)  => {
  return (
    <>
    {displayAddForm ?
      <AddProductForm
        onCancel={onCancel}
        onSubmit={onSubmit}
      /> : 
      <AddFormButton onClick={onClick}/>
    }
    </>
  )
}

export default ToggleableProductForm