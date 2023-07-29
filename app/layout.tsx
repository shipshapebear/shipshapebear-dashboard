import "@/styles/globals.css"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
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
  dashboard: React.ReactNode
  login: React.ReactNode
  children: React.ReactNode
}

export default function RootLayout({ children, dashboard, login }: RootLayoutProps) {
  const user = true

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <meta name="viewport" content="width=1024" />
        <body
          className={cn(
            "bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
