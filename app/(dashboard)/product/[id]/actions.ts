"use server"

import { db } from '@/drizzle/connection'
import { products } from '@/drizzle/schema'
import { notFound } from 'next/navigation'
import { sql } from 'drizzle-orm'

export const handleUpdate = async (id, data) => {
   
    const updateProduct = await db.update(products)
        .set({ title: data.title, description: data.description, price: data.price })
        .where(sql`${products.id}=${id}`)
        .returning({ message: products.id });
}