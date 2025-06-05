interface AddFormButtonProps {
  onClick: () => void;
}

const AddFormButton = ({ onClick }: AddFormButtonProps) => {
  return (
    <p>
      <button className="add-product-button" onClick={() => onClick()}>Add A Product</button>
    </p>
  )
}

export default AddFormButton