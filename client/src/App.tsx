import { useState, useEffect } from 'react'
import type { Product, CartItem, NewProduct } from './types/types.ts'
import Header from './components/Header.tsx'
import ProductsListing from './components/ProductsListing.tsx'
import ToggleableProductForm from './components/ToggleableProductForm.tsx'
import { addProductToCart, deleteProduct, editProduct, getAllProducts, getCart, submitProduct, cartCheckout, updateCartProduct } from './services/shopping.services.ts'
import { decrementProductQuantity, incrementCartQuantity, updateCart } from './utilities/shopping.utilities.ts'


const App = () => {
  const [displayAddForm, setDisplayAddForm] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts()
        if (products) setProducts(products)
      } catch (e) {
        console.log(e)
      }
    }

    const fetchCart = async () => {
      try {
        const cart = await getCart()
        if (cart) setCart(cart)
      } catch (e) {
        console.log(e)
      }
    }

    fetchProducts()
    fetchCart()
  }, [])

  const handleHideAddProductForm = () => {
    setDisplayAddForm(false)
  }

  const handleShowAddProductForm = () => {
    setDisplayAddForm(true)
  }

  const handleSubmitProduct = async (newProduct: NewProduct, callback?: () => void) => {
    try {
      const returnedProduct = await submitProduct(newProduct)
      setProducts(prev => prev.concat(returnedProduct as Product))
      handleHideAddProductForm()
      if (callback) callback()
    } catch (e) {
      console.log(e)
    }

    submitProduct(newProduct)
  }

  const handleDeleteProduct = async (productId: string) => {
    const confirm = window.confirm('Are you sure you want to delete this product?')
    if (!confirm) return
    try {
      await deleteProduct(productId)
      setProducts(prev => prev.filter(p => p._id !== productId))
    } catch (e) {
      console.log(e)
    }
  }

  const handleAddToCart = async (productId: string) => {
    try {
      const {_, item } = await addProductToCart(productId)
      decrementProductQuantity(productId, setProducts)
      incrementCartQuantity(setCart, item)
    } catch (e) {
      console.log(e)
    }
  }

  const handleEdit = async (productId: string, updatedProduct: NewProduct) => {
    const previousProductState = products.filter(product => product._id === productId)[0]
    try {
      const returnedProduct: Product = await editProduct(productId, updatedProduct)
      setProducts(prev => prev.map(p => {
        if (p._id === productId) {
          return returnedProduct
        } else {
          return p
        }
      }))

      await updateCart(cart, setCart, previousProductState, returnedProduct)
    } catch (e) {
      console.log(e)
    }
  }

  const handleCheckout = async () => {
    try {
      await cartCheckout()
      setCart([])
      window.alert('Checked out Successfully')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Header cart={cart} onCheckout={handleCheckout}/>
      <main>
        <ProductsListing
          products={products}
          onDelete={handleDeleteProduct}
          onAddToCart={handleAddToCart}
          onEdit={handleEdit}
        />
        <ToggleableProductForm
          displayAddForm={displayAddForm}
          onCancel={handleHideAddProductForm}
          onSubmit={handleSubmitProduct}
          onClick={handleShowAddProductForm}
        />  
      </main>
    </>
  )
}

export default App
