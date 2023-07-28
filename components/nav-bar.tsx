import { cn } from '@/lib/utils'
import React from 'react'
import { ThemeToggle } from './theme-toggle'

const Navbar = () => {
    return (
        <nav className={cn("navbar sticky top-0 z-10 h-[62px] w-full overflow-hidden border-b border-border bg-background  p-3")}>
            <ThemeToggle />
        </nav>
    )
}

export default Navbar