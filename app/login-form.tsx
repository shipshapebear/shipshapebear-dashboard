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


export function Page({ session }: any) {
    const router = useRouter()
    const supabase = createClientComponentClient()


    const [email, setEmail] = React.useState(null)
    const [password, setPassword] = React.useState(null)



    const handleSignIn = async (e) => {
        e.preventDefault()


        const res = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        router.refresh()
    }

    const handleSignUp = async (e) => {
        const res = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })

        console.log(email, password)
        router.refresh()
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }


    return (
        <div className="flex items-center h-screen">
            <Card className="w-[350px] mx-auto">
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
                <CardFooter className="w-full flex-1 justify-center gap-x-3">
                    {session && <Button variant="outline" className="w-full" onClick={(e) => handleSignOut(e)}>Logout</Button>}
                    <Button className="w-full" type="button" onClick={(e) => handleSignIn(e)}>Login</Button>
                    <Button className="w-full" type="button" onClick={(e) => handleSignUp(e)}>Sign up</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page
