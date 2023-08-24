import { useSupabase } from '@/context/SupabaseProvider'
import AccountForm from './account-form'
import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'

export const revalidate = 0
export default async function Account() {

    return (
        <div className='max-w-lg border-border'>
            <AccountForm />
        </div>
    )


}