import type { CartItem } from "../types/types";

interface CartItemProps {
  cartItem: CartItem
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const {title, price, quantity} = cartItem
  return (
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>${price}</td>
    </tr>
  )
}

export default CartItem