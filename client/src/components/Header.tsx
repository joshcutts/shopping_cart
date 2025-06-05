import type { CartItem } from "../types/types"
import CartTable from "./CartTable";

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