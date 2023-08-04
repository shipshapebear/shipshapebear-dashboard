import React from 'react'
import { profile } from "@/drizzle/schema"
import { db } from "@/drizzle/connection"

export const revalidate = 0
const getData = async () => {
  const allUsers = await db.select().from(profile);

  if (!allUsers) return null

  return allUsers

}

const Page = async () => {
  const data = await getData()
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}

export default Page