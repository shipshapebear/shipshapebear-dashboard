import React from 'react'
import { TailwindIndicator } from "@/components/tailwind-indicator"
import Navbar from "@/app/(dashboard)/nav-bar"
import { cn } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import Footer from './footer'

const Layout = async ({ children }: any) => {

    const supabase = createClient()

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login')
    }

    return (
        <div className="flex">
            {/* <Sidebar /> */}
            <div className="w-full flex-col">
                <Navbar />
                <main className={cn("w-full bg-background transition-all duration-200 ease-in-out")}>
                    <div className='h-full min-h-[100vh] max-w-screen-xl mx-auto overflow-x-hidden p-3 mt-10'>
                        {children}
                    </div>
                </main>
                <Footer/>
            </div>
            <TailwindIndicator />
        </div>
    )
}

export default Layout