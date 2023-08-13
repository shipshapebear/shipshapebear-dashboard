import React from 'react'
import { db } from '@/drizzle/connection'
import { products } from '@/drizzle/schema'
import { notFound } from 'next/navigation'
import { sql } from 'drizzle-orm'
import ProductForm from './product-form'

export const revalidate = 120
async function getData({ id }: any) {
    // Fetch data from your API here.
    const product = await db.select().from(products).where(sql`${products.id} = ${id}`);

    if (!product) {
        notFound()
    }

    return product[0]
}



const page = async ({ params }: any) => {
    const data = await getData(params)
    return (
        <ProductForm product={data}/>
    )
}

export default page