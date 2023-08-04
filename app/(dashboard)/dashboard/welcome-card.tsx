import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
import ClientSideAvatar from './clienside-avatar'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'


interface CardI {
    displayName?: string | null
    username?: string | null
    avatarUrl?: string | null
}

const WelcomeCard = ({ avatarUrl, username }: CardI) => {

    return (
        <Card className='max-w-lg'>
            <CardHeader className='flex flex-row justify-between'>
                <div>
                    <CardDescription>Welcome</CardDescription>
                    <CardTitle>{username}</CardTitle>
                </div>
                <ClientSideAvatar avatarUrl={avatarUrl} />
            </CardHeader>
            <CardContent>
                <p>Welcome to your dashboard! We're thrilled to have you here and ready to assist you on your journey.</p>
            </CardContent>
            <CardFooter>
                <Link href="/profile" className={buttonVariants({ variant: "default" })}>Go to profile</Link>
            </CardFooter>
        </Card>
    )
}

export default WelcomeCard