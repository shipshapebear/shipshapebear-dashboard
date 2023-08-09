'use client'
import { useState, useRef } from 'react'
import UserAvatar from './user-avatar'
import { Session } from '@supabase/auth-helpers-nextjs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useToast } from '@/lib/utils/useToast'
import { useAuth } from '@/context/SessionProvider'
import { useSupabase } from '@/context/SupabaseProvider'

export default function AccountForm() {
    const { supabase } = useSupabase()
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const { user } = useAuth()
    const [avatar_url, setAvatarUrl] = useState<string | null | undefined>(user?.avatar_url)

    async function updateProfile({
        display_name,
        username,
        website,
        avatar_url }: any
    ) {
        try {
            setIsLoading(true)

            let { error } = await supabase.from('profile').upsert({
                id: user?.id as string,
                display_name,
                username,
                website,
                avatar_url,
                updated_at: new Date().toISOString(),
            })
            if (error) throw error
            toast({
                variant: "success",
                description: "Your profile is successsfully updated."
            })
        } catch (error) {
            alert('Error updating the data!')
        } finally {
            setIsLoading(false)
        }
    }

    const display_name = useRef<HTMLInputElement>(null)
    const username = useRef<HTMLInputElement>(null)
    const website = useRef<HTMLInputElement>(null)

    return (
        <Card className="p-10">
            <UserAvatar
                user={user}
                supabase={supabase}
                onUpload={(url) => {
                    setAvatarUrl(url)
                }}
            />
            <div className='[&>*+*]:mt-4'>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="text" value={user?.session?.user.email} disabled />
                </div>
                <div>
                    <Label htmlFor="displayName">Full Name</Label>
                    <Input
                        id="displayName"
                        type="text"
                        defaultValue={user?.display_name || ''}
                        ref={display_name}
                    />
                </div>
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        defaultValue={user?.username || ''}
                        ref={username}
                    />
                </div>
                <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                        id="website"
                        type="url"
                        defaultValue={user?.website || ''}
                        ref={website}
                    />
                </div>
            </div>

            <div className='mt-10 flex justify-end gap-3'>
                <form action="/auth/signout" method="post">
                    <Button className="Button block" type="submit" variant="outline">
                        Sign out
                    </Button>
                </form>
                <Button
                    className="Button primary block"
                    onClick={() => updateProfile({ display_name: display_name.current?.value, username: username.current?.value, website: website.current?.value, avatar_url: avatar_url })}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading' : 'Update'}
                </Button>
            </div>
        </Card>
    )
}