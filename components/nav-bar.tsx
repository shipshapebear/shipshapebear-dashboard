import { cn } from '@/lib/utils'
import React from 'react'
import { ThemeToggle } from './theme-toggle'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { Icons } from './icons'
import { buttonVariants } from './ui/button'

const Navbar = () => {
    return (
        <nav className={cn("navbar sticky top-0 z-10 flex h-[62px] w-full justify-end overflow-hidden border-b  border-border bg-background p-3")}>
            <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
            >
                <div
                    className={buttonVariants({
                        size: "icon",
                        variant: "ghost",
                    })}
                >
                    <Icons.gitHub className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                </div>
            </Link>
            <ThemeToggle />
        </nav>
    )
}

export default Navbar