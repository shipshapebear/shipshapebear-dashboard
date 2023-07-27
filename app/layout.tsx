import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/side-bar"
import Navbar from "@/components/nav-bar"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <meta name="viewport" content="width=1024" />
        <body
          className={cn(
            "min-h-screen overflow-x-hidden bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Sidebar />
            <main className={cn("h-full min-h-screen w-full bg-background transition-all duration-200 ease-in-out")}>
              <div className=" h-full min-h-screen">
                <Navbar />
                <div className='mt-[62px] p-3'>
                  {children}
                </div>
              </div>
            </main>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
