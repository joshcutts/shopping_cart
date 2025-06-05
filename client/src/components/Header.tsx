import type { CartItem } from "../types/types"

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

interface CartTableProps {
  cart: CartItem[];
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

interface HeaderProps {
  cart: CartItem[];
  onCheckout: () => void;
}
const Header = ({ cart, onCheckout }: HeaderProps) => {
  const showCart = cart.length !== 0
  const total = cart.reduce((sum, cartItem) => sum += (cartItem.price * cartItem.quantity), 0)
  const empty = (
    <>
      <p>Your cart is empty</p>
      <p>Total: $0</p>
    </>
  )
  return (
      <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        {showCart ? <CartTable cart={cart} total={total}/> : empty}
        <button className="checkout" disabled={!showCart} onClick={onCheckout}>Checkout</button>
      </div>
    </header>
  )
}

export default Header