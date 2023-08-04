import { notFound } from "next/navigation"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@supabase/supabase-js'


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
    const { data: profile } = await supabase
        .from("profile")
        .select("*")

    const profileMap: any = {};
    profile?.forEach((profileData) => {
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
            <DataTable columns={columns} data={data} />
        </div>
    )
}
