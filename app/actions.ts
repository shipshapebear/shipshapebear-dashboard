"use server"

import { notFound } from "next/navigation"
import { db } from "@/drizzle/connection"
import { products } from "@/drizzle/schema"
import { InferModel, sql } from "drizzle-orm"

export const handleUpdate = async (id, data) => {
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
