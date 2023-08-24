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
        <nav className={cn("navbar relative z-10 flex h-[120px] w-full justify-end overflow-hidden border-b  border-border bg-background p-3 pb-0")}>
            <div className='flex gap-2 w-full justify-between'>
                <div className='relative'>
                    <Button className='flex-none'>Create Appointment</Button>
                    <ul className='flex pt-3 absolute bottom-0'>
                        {Menu.map((val) => {
                            const isActive = pathname === val.link
                            return (
                                <li key={val.value} className="relative py-2" >
                                    <Link href={val.link} className={cn("flex select-none items-center z-10 text-sm text-foreground ")}>
                                        <div className="px-2 py-1 relative before:-z-10 before:bg-transparent before:content-[''] before:rounded-md hover:before:bg-accent before:absolute before:w-full before:h-full before:inset-0">
                                            {val.value}
                                        </div>
                                    </Link>
                                    {
                                        isActive && <motion.div
                                            className="block absolute bottom-0 -z-10 bg-primary h-[2px] w-[90%] left-[5%]"
                                            layoutId="bar"
                                            transition={{
                                                type: 'spring',
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    }
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
        </nav >
    )
}

export default Navbar