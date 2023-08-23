"use client"
import { cn } from '@/lib/utils'
import React from 'react'
import { ThemeToggle } from './theme-toggle'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { Icons } from './icons'
import { Button, buttonVariants } from './ui/button'
import UserDropdown from "@/components/user-dropdown"
import { Menu } from "./Menu"
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'


const Navbar = () => {
    const pathname = usePathname()

    return (
        <nav className={cn("navbar sticky top-0 z-10 flex h-[120px] w-full justify-end overflow-hidden border-b  border-border bg-background p-3 pb-0")}>
            <div className='flex gap-2 w-full justify-between'>
                <div className='relative'>
                    <Button className='flex-none'>Create Appointment</Button>
                    <ul className='flex pt-3 absolute bottom-0'>
                        {Menu.map((val) => {
                            const isActive = pathname === val.link
                            return (
                                <li key={val.value} className='relative px-4 py-2'>
                                    <Link href={val.link} className={cn("flex select-none items-center z-10 text-sm text-primary-foreground", !isActive && "text-foreground")}>
                                        {val.value}
                                    </Link>
                                    {isActive && <motion.div
                                        className="block absolute bg-primary p-2 inset-0 -z-10 rounded-t-md"
                                        layoutId="pagination"
                                        transition={{
                                            type: 'spring',
                                            stiffness: 350,
                                            damping: 30,
                                        }}
                                    />}
                                </li>)
                        })}
                    </ul>
                </div>
                <div className='flex items-center gap-2 self-start'>
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
                    <UserDropdown />
                </div>
            </div>
        </nav>
    )
}

export default Navbar