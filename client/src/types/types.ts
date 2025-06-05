import {z} from 'zod'

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  quantity: z.number().min(0),
  price: z.number().min(0.01)
})

export const cartItemSchema = z.object({
  _id: z.string(),
  productId: z.string(),
  title: z.string(),
  quantity: z.number().min(0),
  price: z.number().min(0.01)
})

export type Product = z.infer<typeof productSchema>
export type CartItem = z.infer<typeof cartItemSchema>

// export interface Product {
//   _id: string;
//   title: string;
//   quantity: number;
//   price: number;
// }

// export interface CartItem {
//   _id: string;
//   productId: string;
//   title: string;
//   quantity: number;
//   price: number;
// }

export type NewProduct = Omit<Product, '_id'>