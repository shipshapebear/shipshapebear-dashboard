import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import LoginForm from './login-form'



export default async function Login() {
    const supabase = createServerComponentClient({ cookies })


    const { data: { session } } = await supabase.auth.getSession()
    console.log(session)

    return <LoginForm session={session}/>
}