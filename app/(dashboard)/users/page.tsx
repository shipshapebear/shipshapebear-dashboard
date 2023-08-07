import { notFound } from "next/navigation"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@supabase/supabase-js'
import { profile } from "@/drizzle/schema"
import { db } from "@/drizzle/connection"

export const revalidate = 0
async function getData() {
    // Fetch data from your API here.
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_ADMIN_SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })

    // Access auth admin api
    const adminAuthClient = supabase.auth.admin
    const { data: { users }, error } = await adminAuthClient.listUsers()
    const userProfiles = await db.select().from(profile);

    const profileMap: any = {};
    userProfiles?.forEach((profileData) => {
        profileMap[profileData.id] = profileData;
    });

    // Merge the data
    const mergedData = users.map((userData) => {
        const { id } = userData;
        return {
            ...userData,
            ...profileMap[id] || null,
        };
    });

    if (!profile || !users) {
        notFound()
    }

    return mergedData
}

export default async function Page() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <h1 className='mb-4 text-2xl font-bold text-foreground capitalize'>{process.env.NODE_ENV} Users</h1>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
