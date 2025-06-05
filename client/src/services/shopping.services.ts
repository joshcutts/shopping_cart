import axios from 'axios';
import type { Product, NewProduct } from '../types/types.ts'
import { productSchema, cartItemSchema } from '../types/types.ts'
import {z} from 'zod'

const productsSchema = z.array(productSchema)
const cartsItemSchema = z.array(cartItemSchema)
const addToCartResponseSchema = z.object({
  product: productSchema,
  item: cartItemSchema,
});

const getAllProducts = async () => {
  try {
    const {data} = await axios.get('/api/products')
    return productsSchema.parse(data)
  } catch (e) {
    console.log(e)
  }
}

const submitProduct = async (newProduct: NewProduct): Promise<Product | undefined> => {
  try {
    const {data} = await axios.post('/api/products', newProduct)
    return productSchema.parse(data)
  } catch (e) {
    console.log(e)
  }
}

const deleteProduct = async (productId: string) => {
  try {
    await axios.delete(`/api/products/${productId}`)
  } catch (e) {
    console.log(e)
  }
}

const addProductToCart = async (productId: string) => {
  try {
    const { data } = await axios.post('/api/add-to-cart', {productId})
    return addToCartResponseSchema.parse(data)
  } catch (e) {
    console.log(e)
  }
}

const editProduct = async (productId: string, updatedProduct: NewProduct): Promise<Product | undefined> => {
  try {
    const { data } = await axios.put(`/api/products/${productId}`, updatedProduct)
    return productSchema.parse(data)
  } catch (e) {
    console.log(e)
  }
}

const getCart = async () => {
  try {
    const { data } = await axios.get('/api/cart')
    return cartsItemSchema.parse(data)
  } catch (e) {
    console.log(e)
  }
}

const cartCheckout = async () => {
  try {
    await axios.post('/api/checkout')
  } catch (e) {
    console.log(e)
  }
}

const updateCartProduct = async (productId: string, updatedCartProduct: {title: string, price: number}) => {
  try {
    const {data} = await axios.patch(`/api/cart/${productId}`, updatedCartProduct)
    return cartItemSchema.parse(data)
  } catch (e) {
    console.log(e)
  }
}


export { getAllProducts, submitProduct, deleteProduct, addProductToCart, editProduct, getCart, cartCheckout, updateCartProduct }