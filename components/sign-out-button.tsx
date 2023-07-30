"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


type TSignout = {
    children: React.ReactNode
}
const SignOut = ({ children }: TSignout) => {
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }
    return (
        <button className='relative flex h-full w-full cursor-default select-none items-center rounded-sm text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground ' onClick={handleSignOut}>
            {children}
        </button>
    )
}

export default SignOut