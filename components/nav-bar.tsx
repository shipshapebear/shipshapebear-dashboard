"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SiteLogo from "@/assets/images/site-logo.png"
import { motion } from "framer-motion"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import UserDropdown from "@/components/user-dropdown"

import { DropDownMenu, Menu } from "./Menu"
import { Icons } from "./icons"
import { ThemeToggle } from "./theme-toggle"
import { Button, buttonVariants } from "./ui/button"

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 px-3 py-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "navbar relative z-10 flex h-[120px] w-full justify-end overflow-visible border-b  border-border bg-background p-3 pb-0"
      )}
    >
      <div className="flex gap-2 w-full justify-between">
        <div className="relative">
          <Link className="flex items-center gap-2" href="/">
            <Image src={SiteLogo} alt="site logo" width={50} height={50} />
            <p className="font-bold text-2xl">SSB Appointment System</p>
          </Link>
          <div className="flex pt-3 gap-2 absolute bottom-0">
            {Menu.map((val) => {
              const isActive = pathname === val.link
              return (
                <NavigationMenu key={val.link} className="relative py-2">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link href={val.link} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {val.value}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                  {isActive && (
                    <motion.div
                      className="block absolute bottom-0 -z-10 bg-primary h-[2px] w-full"
                      layoutId="bar"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </NavigationMenu>
              )
            })}

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-[28px]">
                    Maintenance
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col w-[180px]">
                      {DropDownMenu.map((menu) => (
                        <ListItem
                          key={menu.link}
                          href={menu.link}
                          title={menu.title}
                        ></ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
              {(pathname === "/manage-appointments" ||
                pathname === "/manage-patients" ||
                pathname === "/manage-dentists" ||
                pathname === "/users" ||
                pathname === "/profile") && (
                <motion.div
                  className="block absolute bottom-0 -z-10 bg-primary h-[2px] w-full"
                  layoutId="bar"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
            </NavigationMenu>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex items-center gap-2 justify-end w-full">
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
          <Button className="mb-2 rounded-full">Create Appointment</Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
