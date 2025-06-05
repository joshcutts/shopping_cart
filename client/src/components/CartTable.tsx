import CartItem from "./CartItem";
import type { CartItem as CartItemProp } from "../types/types";

interface CartTableProps {
  cart: CartItemProp[];
  total: number;
}

const CartTable = ({ cart, total }: CartTableProps) => {
  return (
    <table className="cart-items">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(c => <CartItem key={c._id} cartItem={c}/>)}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="total">Total: ${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
  )
}

export default CartTable