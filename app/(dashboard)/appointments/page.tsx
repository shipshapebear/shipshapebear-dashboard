import { notFound } from "next/navigation"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { products } from "@/drizzle/schema"
import { db } from "@/drizzle/connection"


export const revalidate = 120
async function getData() {
    // Fetch data from your API here.
    const productItems = await db.select().from(products);

    if (!productItems) {
        notFound()
    }

    return productItems
}

export default async function Page() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <h1 className='mb-4 text-2xl font-bold capitalize text-foreground'>{process.env.NODE_ENV} Appointments</h1>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
