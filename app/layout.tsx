import "@/styles/globals.css"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import SupabaseProvider from "@/context/SupabaseProvider"
import SessionProvider from "@/context/SessionProvider"
import { createClient } from "@/lib/supabase-server"

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

export const dynamic = 'force-dynamic'
export default async function RootLayout({ children }: RootLayoutProps) {

  const supabase = createClient()
  const { data: { session }, } = await supabase.auth.getSession();


  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      <meta name="viewport" content="width=1024" />
      <body
        className={cn(
          "bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <SupabaseProvider>
          <SessionProvider serverSession={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider >
          </SessionProvider>
        </SupabaseProvider>
      </body>
    </html >
  )
}
