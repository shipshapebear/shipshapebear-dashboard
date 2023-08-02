import AccountForm from './account-form'
import { createClient } from '@/lib/supabase-server'

export default async function Account() {
    const supabase = createClient()
    const {
        data: { session },
    } = await supabase.auth.getSession()



    return (
        <div className='max-w-lg border-border p-5'>
            <AccountForm session={session} />
        </div>
    )


}