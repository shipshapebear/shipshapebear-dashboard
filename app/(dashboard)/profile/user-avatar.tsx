'use client'
import React, { useEffect, useState } from 'react'
import { Database } from '@/types/database'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AiOutlineUser } from 'react-icons/ai'
import useImageDownloader from '@/lib/utils/useImageDownloader'
import { buttonVariants } from '@/components/ui/button'
import { BiUpload } from 'react-icons/bi'

type Profiles = Database['public']['Tables']['profile']['Row']

export default function UserAvatar({
    uid,
    url,
    onUpload,
}: {
    uid?: string
    url: Profiles['avatar_url']
    onUpload: (url: string) => void
}) {
    const supabase = createClientComponentClient<Database>()
    const [uploading, setUploading] = useState(false)
    const imageUrl: any = useImageDownloader(url, supabase, "avatars")
    const [imagePreview, setImagePreview] = useState(null);

    console.log(imageUrl)

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
            if (file) {
                const reader: any = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
            }
        } catch (error) {
            alert('Error uploading avatar!')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            <div className='flex flex-col items-center gap-4'>
                {imagePreview ? <Avatar className="mx-auto h-36 w-36">
                    <AvatarImage src={imagePreview} alt="user image" />
                    <AvatarFallback><AiOutlineUser /></AvatarFallback>
                </Avatar> : <Avatar className="mx-auto h-36 w-36">
                    <AvatarImage src={imageUrl} alt="user image" />
                    <AvatarFallback><AiOutlineUser /></AvatarFallback>
                </Avatar>
                }

                <div className={buttonVariants({ variant: 'default' })}>
                    <label className="button primary inline-flex items-center gap-x-2" htmlFor="single">
                        {imageUrl ? "Update photo" : "Upload photo"}<BiUpload className='h-[20px] w-[20px]' />
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
        </div>
    )
}