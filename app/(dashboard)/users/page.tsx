import { notFound } from "next/navigation"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { profile } from "@/drizzle/schema"
import { db } from "@/drizzle/connection"

export const revalidate = 0

async function getData() {
    const userProfiles = await db.select().from(profile);

    if (!profile) {
        notFound()
    }

    return userProfiles
}

export default async function Page() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <h1 className='mb-4 text-2xl font-bold capitalize text-foreground'>{process.env.NODE_ENV} Users</h1>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
