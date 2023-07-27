import { cn } from '@/lib/utils'
import React from 'react'
import { ThemeToggle } from './theme-toggle'

const Navbar = () => {
    return (
        <nav className={cn("navbar fixed top-0 h-[62px] w-full border-b border-border bg-background  p-3")}>
            <ThemeToggle />
        </nav>
    )
}

export default Navbar