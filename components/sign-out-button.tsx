"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const SignOut = () => {
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }
    return (
        <Button onClick={handleSignOut}>Sign Out</Button>
    )
}

export default SignOut