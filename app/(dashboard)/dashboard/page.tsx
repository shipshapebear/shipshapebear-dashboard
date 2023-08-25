import React from 'react'
import { db } from "@/drizzle/connection"
import { createClient } from '@/lib/supabase-server'
import { profile } from '@/drizzle/schema'
import { eq, lt, gte, ne, sql, InferModel } from "drizzle-orm";
import { useAuth } from '@/context/SessionProvider'
import WelcomeCard from './welcome-card';
import DashboardContent from './dashboard-content';

export const revalidate = 0
const getData = async () => {
  type User = InferModel<typeof profile, "select">;

  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const userId = session?.user.id
  const user: User[] = await db.select().from(profile).where(sql`${profile.id} = ${userId}`);
  if (!user) return null

  return {
    session,
    ...user[0]
  }

}

const Page = async () => {
  const data = await getData()

  return (
    <>
      <h1 className='mb-4 text-2xl font-bold text-foreground capitalize'>{process.env.NODE_ENV} Dashboard</h1>
      <DashboardContent data={data} />
    </>
  )
}

export default Page