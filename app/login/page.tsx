import LoginForm from './login-form'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'


export default async function Login() {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
        redirect('/dashboard')
    }

    return <LoginForm />
}