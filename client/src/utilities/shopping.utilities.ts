import type { Product, CartItem } from '../types/types.ts'
import { updateCartProduct } from '../services/shopping.services.ts'

const decrementProductQuantity = (
  productId: string,
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  setProducts(prev => prev.map(p => {
  if (p._id === productId) {
    return {...p, quantity: p.quantity - 1}
  } else {
    return p
  }
  }))
}

const incrementCartQuantity = (
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>,
  item: CartItem
) => {
  setCart(prevCart => {
    const itemExists = prevCart.some(cart => cart.productId === item.productId)

    if (!itemExists) return [...prevCart, item]

    return prevCart.map(cartItem => {
      if (cartItem.productId === item.productId) {
        return {...cartItem, quantity: cartItem.quantity + 1}
      } else {
        return cartItem
      }
    })
  })
}

const cartNeedsUpdate = (cart: CartItem[], previousProductState: Product, returnedProduct: Product) => {
  const productId = previousProductState._id
  const productInCart = cart.some(cartItem => cartItem.productId === productId)
  const titleChanged = previousProductState.title !== returnedProduct.title
  const priceChanged = previousProductState.price !== returnedProduct.price

  return productInCart && (titleChanged || priceChanged)
}

const updateCartAlert = (previousProductState: Product, returnedProduct: Product) => {
  const prevTitle = `Title: ${previousProductState.title}`;
  const newTitle = `Title: ${returnedProduct.title}`;

  const prevPrice = `Price: $${previousProductState.price.toFixed(2)}`;
  const newPrice = `Price: $${returnedProduct.price.toFixed(2)}`;

  window.alert(
  `Information on an item in your cart has changed:\n\n` +
  `Previous:\n` +
  `${prevTitle}\n` +
  `${prevPrice}\n\n` +
  `New:\n` +
  `${newTitle}\n` +
  `${newPrice}`
  );
}

const updateCart = async (
  cart: CartItem[],
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>,
  previousProductState: Product,
  returnedProduct: Product
) => {
  const productId = previousProductState._id

  if (cartNeedsUpdate(cart, previousProductState, returnedProduct)) {
    updateCartAlert(previousProductState, returnedProduct)
  
    try {
      await updateCartProduct(productId, {title: returnedProduct.title, price: returnedProduct.price})
    } catch (e) {
      console.log(e)
    }

    setCart(prevCart => prevCart.map(cartItem => {
      if (cartItem.productId === productId) {
        return {
          ...cartItem,
          title: returnedProduct.title,
          price: returnedProduct.price
        }
      } else {
        return cartItem
      }
    }))
  }
}

export { decrementProductQuantity, incrementCartQuantity, updateCart }
