import { notFound } from "next/navigation"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { products } from "@/drizzle/schema"
import { db } from "@/drizzle/connection"
import { DialogHeader } from "@/components/ui/dialog"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@radix-ui/react-dialog"

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
            <DataTable columns={columns} data={data} />
        </div>
    )
}
