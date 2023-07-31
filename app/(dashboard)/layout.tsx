import React from 'react'
import { TailwindIndicator } from "@/components/tailwind-indicator"
import Sidebar from "@/components/side-bar"
import Navbar from "@/components/nav-bar"
import { cn } from '@/lib/utils'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

const Layout = async ({ children }: any) => {

    const supabase = createServerComponentClient<Database>({
        cookies
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login')
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full flex-col">
                <Navbar session={session} />
                <main className={cn("w-full bg-background transition-all duration-200 ease-in-out")}>
                    <div className='h-full min-h-[100vh] overflow-x-hidden p-3'>
                        {children}
                    </div>
                </main>
            </div>
            <TailwindIndicator />
        </div>
    )
}

export default Layout