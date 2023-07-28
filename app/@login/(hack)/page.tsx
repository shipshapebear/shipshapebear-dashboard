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
export function Page() {


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
                                <Label htmlFor="name">Username or Email</Label>
                                <Input id="name" placeholder="Username or Email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Password" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="w-full flex-1 justify-center gap-x-3">
                    <Button variant="outline" className="w-full">Cancel</Button>
                    <Button className="w-full" >Login</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page
