"use server"

import { db } from "@/drizzle/connection"
import { products } from "@/drizzle/schema"
import { InferModel, sql } from "drizzle-orm"


export const handleUpdate = async (id: number, data: { title: string; description: string; price: string }) => {
  await db
    .update(products)
    .set({
      title: data.title,
      description: data.description,
      price: data.price,
    })
    .where(sql`${products.id}=${id}`)
    .returning({ message: products.id })
}

type NewProduct = InferModel<typeof products, "insert">

export const handleAdd = async (product: NewProduct) => {
  await db.insert(products).values(product)
}

export const handleDeleteIds = async (ids: number[]) => {
  for (let id in ids) {
    await db.delete(products).where(sql`${products.id}=${ids[id]}`)
  }
}
export const handleDeleteId = async (id: number) => {
  await db.delete(products).where(sql`${products.id}=${id}`)
}
