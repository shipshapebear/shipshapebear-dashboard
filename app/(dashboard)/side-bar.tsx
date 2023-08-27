"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import SiteLogo from "@/assets/images/site-logo.png"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { LayoutDashboard, Layers, Users, User, ChevronLeft, ShoppingCart } from 'lucide-react'

const Sidebar = () => {
    const [toggled, setToggled] = useState(true)
    const pathname = usePathname()

    const Menu = [
        { value: "Dashboard", link: "/dashboard", icon: <LayoutDashboard className={cn("mx-4 h-10 w-6", toggled ? "mx-4 inline-block " : "mx-auto block")} /> },
        { value: "Services", link: "/services", icon: <Layers className={cn("mx-4 h-10 w-6", toggled ? "mx-4 inline-block " : "mx-auto block")} /> },
        { value: "Products", link: "/products", icon: <ShoppingCart className={cn("mx-4 h-10 w-6", toggled ? "mx-4 inline-block " : "mx-auto block")} /> },
        { value: "Users", link: "/users", icon: <Users className={cn("mx-4 h-10 w-6", toggled ? "mx-4 inline-block " : "mx-auto block")} /> },
        { value: "Profile", link: "/profile", icon: <User className={cn("mx-4 h-10 w-6", toggled ? "mx-4 inline-block " : "mx-auto block")} /> }
    ]

    return (
        <div className={cn("sticky left-0 top-0 z-20 h-full min-h-[100vh] border-r border-border bg-background")}>
            <div className={cn("relative h-full transition-all duration-200 ease-in-out",
                toggled ? "w-[300px]"
                    : "w-[calc(40px+1.5rem)]")}>
                <div className={cn('flex h-[62px] items-center p-3', toggled ? "justify-between" : "justify-center")}>
                    <Link
                        rel="noreferrer"
                        href="/"
                        className={cn("!hover:bg-none flex gap-3")}>
                        <Image alt='logo' src={SiteLogo} className='mx-auto block h-auto w-[30px]' /> {toggled && <span className='font-bold'>shipshapebear</span>}
                    </Link>
                    <button id="collapsed-button" type='button' onClick={() => setToggled(!toggled)} className={cn("absolute right-[-10px] h-[20px] w-[20px]  rounded-full bg-accent outline-1")}>
                        <ChevronLeft strokeWidth={0.75} className={cn("m-auto h-full w-full text-foreground", !toggled ? "rotate-180" : "rotate-[0]")} />
                        <span className='sr-only'>collapse sidebar</span>
                    </button>
                </div>
                <TooltipProvider disableHoverableContent delayDuration={300} >
                    <ul className='p-3'>
                        {Menu.map((val) => (
                            <li key={val.value}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className={`cursor-pointer rounded-sm  hover:bg-accent hover:text-accent-foreground ${pathname === val.link ? "bg-accent" : ""}`}>
                                            <Link href={val.link} className='flex select-none items-center'>
                                                {val.icon}
                                                {toggled && <span>{val.value}</span>}
                                            </Link>
                                        </div>
                                    </TooltipTrigger>
                                    {!toggled && <TooltipContent side='right'>
                                        {val.value}
                                    </TooltipContent>}
                                </Tooltip>
                            </li>
                        ))}
                    </ul>
                </TooltipProvider>
            </div>
        </div>
    )
}

export default Sidebar