"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import SiteLogo from "@/assets/images/site-logo.png"
import { IoIosArrowBack } from 'react-icons/io'
import { CiLink } from 'react-icons/ci'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

const Sidebar = () => {
    const [toggled, setToggled] = useState(true)
    const pathname = usePathname()

    return (

        <div className={cn("sticky left-0 top-0 z-20 h-full min-h-[100vh] border-r border-border bg-background", toggled ? "[&~main]:ml-[var(--aside-width)]" : " [&~main]:ml-[var(--collapsed-aside-width)]")}>
            <div className={cn("relative h-full transition-all duration-200 ease-in-out",
                toggled ? "w-[300px]"
                    : "w-[calc(40px+1.5rem)]")}>
                <div className={cn('flex h-[62px] items-center p-3', toggled ? "justify-between" : "justify-center")}>
                    <Link target="_blank"
                        rel="noreferrer"
                        href="/"
                        className={cn("!hover:bg-none flex gap-3")}>
                        <Image alt='logo' src={SiteLogo} className='mx-auto block h-auto w-[30px]' /> {toggled && <span className='font-bold'>shipshapebear</span>}
                    </Link>

                    <button onClick={() => setToggled(!toggled)} className={cn("absolute right-[-9px] h-[20px] w-[20px]  rounded-full bg-accent outline-1")}>
                        <IoIosArrowBack className={cn("m-auto text-foreground", !toggled ? "rotate-180" : "rotate-[0]")} />
                        <span className='sr-only'>collapse sidebar</span>
                    </button>
                </div>

                <ul className='p-3'>
                    {[
                        { value: "Home", link: "/" },
                        { value: "About", link: "/about" },
                        { value: "Services", link: "/services" }
                    ].map((val) => (
                        <>
                            {!toggled ?
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <li key={val.value} className={`cursor-pointer rounded-sm  hover:bg-accent hover:text-accent-foreground ${pathname === val.link ? "bg-accent" : ""}`}>
                                                <Link href={val.link} className='flex items-center'>
                                                    <CiLink className={cn("mx-4 h-10 w-6", toggled ? "mx-4 inline-block " : "mx-auto block")} />
                                                    {toggled && <span>{val.value}</span>}
                                                </Link>
                                            </li>
                                        </TooltipTrigger>
                                        <TooltipContent side='right'>
                                            {val.value}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider> :
                                <li key={val.value} className={`cursor-pointer rounded-sm  hover:bg-accent hover:text-accent-foreground ${pathname === val.link ? "bg-accent" : ""}`}>
                                    <Link href={val.link} className='flex items-center'>
                                        <CiLink className={cn("mx-4 h-10 w-6", toggled ? "mx-4 inline-block " : "mx-auto block")} />
                                        {toggled && <span>{val.value}</span>}
                                    </Link>
                                </li>}
                        </>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar