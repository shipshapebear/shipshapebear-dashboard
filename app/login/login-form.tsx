"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useAuth } from "@/context/SessionProvider"


export function Page() {
    const router = useRouter()
    const supabase = createClientComponentClient()

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const { signInWithEmail } = useAuth()

    const handleSignUp = async (e: any) => {
        e.preventDefault()
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        router.refresh()
    }

    return (
        <div className="flex h-screen items-center">
            <Card className="mx-auto w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login crendentials</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email or number</Label>
                                <Input id="name" placeholder="Email or number" onChange={(e: any) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Password" onChange={(e: any) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="w-full flex-1 flex-col justify-center gap-y-3">
                    <Button className="w-full" type="submit" onClick={() => signInWithEmail(email, password)}>Login</Button>
                    <Button className="w-full" type="button" variant="outline" onClick={(e) => handleSignUp(e)}>Sign up</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page
