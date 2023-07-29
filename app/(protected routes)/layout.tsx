import Navbar from '@/components/nav-bar'
import { cn } from '@/lib/utils'
import Sidebar from '@/components/side-bar'
import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full flex-col">
                <Navbar />
                <main className={cn("w-full bg-background transition-all duration-200 ease-in-out")}>
                    <div className='h-full min-h-[100vh] overflow-x-hidden p-3'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Layout