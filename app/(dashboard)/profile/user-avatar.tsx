'use client'
import React, { useEffect, useState } from 'react'
import { Database } from '@/types/database'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AiOutlineUser } from 'react-icons/ai'
import useImageDownloader from '@/lib/utils/useImageDownloader'


type Profiles = Database['public']['Tables']['profile']['Row']

export default function UserAvatar({
    uid,
    url,
    size,
    onUpload,
}: {
    uid?: string
    url: Profiles['avatar_url']
    size: number
    onUpload: (url: string) => void
}) {
    const supabase = createClientComponentClient<Database>()
    const [uploading, setUploading] = useState(false)
    const imageUrl = useImageDownloader(url, supabase, "avatars")

    const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const filePath = `${uid}-${Math.random()}.${fileExt}`


            let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            onUpload(filePath)
        } catch (error) {
            alert('Error uploading avatar!')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            <Avatar className="h-20 w-20">
                <AvatarImage src={imageUrl} alt="user image" />
                <AvatarFallback><AiOutlineUser /></AvatarFallback>
            </Avatar>
            <div style={{ width: size }}>
                <label className="button primary block" htmlFor="single">
                    Upload photo
                </label>
                <input
                    style={{
                        visibility: 'hidden',
                        position: 'absolute',
                    }}
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                />
            </div>
        </div>
    )
}