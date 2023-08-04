"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSupabase } from '@/context/SupabaseProvider'
import useImageDownloader from '@/lib/utils/useImageDownloader'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'

interface AvatarI {
    avatarUrl?: string | null
}

const ClientSideAvatar = ({ avatarUrl }: AvatarI) => {
    const { supabase } = useSupabase()
    const imageUrl: any = useImageDownloader(avatarUrl, supabase, "avatars")

    return (
        <Avatar>
            <AvatarImage src={imageUrl} alt="user image" />
            <AvatarFallback><AiOutlineUser /></AvatarFallback>
        </Avatar>
    )
}

export default ClientSideAvatar