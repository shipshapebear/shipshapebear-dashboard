import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import LoginForm from './login-form'
import { redirect } from 'next/navigation'


export default async function Login() {
    const supabase = createServerComponentClient({ cookies })


    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
        redirect('/dashboard')
    }

    return <LoginForm session={session} />
}