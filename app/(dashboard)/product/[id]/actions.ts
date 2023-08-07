"use server"

import { notFound } from "next/navigation"
import { db } from "@/drizzle/connection"
import { products } from "@/drizzle/schema"
import { sql } from "drizzle-orm"

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
