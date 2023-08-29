import { notFound } from "next/navigation"
import { products } from "@/drizzle/schema"
import { db } from "@/drizzle/connection"
import Appointments from "./appointment-content";


export const revalidate = 0
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
            <Appointments />
        </div>
    )
}
