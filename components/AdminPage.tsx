import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { createClient as createAdminClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

type UserData = {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string
  phone: string
  confirmed_at: string
  last_sign_in_at: string
  app_metadata: [Object]
  user_metadata: UserMetaData
  identities: null
  created_at: string
  updated_at: string
  is_anonymous: boolean
}

type UserMetaData = {
  sub: string
  role: string
  about: string
  email: string
  username: string
  last_name: string
  first_name: string
  profile_photo: string
  email_verified: boolean
  phone_verified: boolean
  profile_picture: string
}

const supabase = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

export default async function AdminPage() {
  const { data } = await supabase.auth.admin.listUsers()

  return (
    <div className="grid md:grid-cols-3 md:gap-4">
      <AdminUserCard users={data.users} />
    </div>
  )
}

export function AdminUserCard({ users }: { users: any }) {
  async function deleteUser(formData: FormData) {
    "use server"

    const id = formData.get("id") as string
    await supabase.auth.admin.deleteUser(id)

    revalidatePath("/admin")
  }

  return (
    <>
      {users.map((item: UserData, index: number) => (
        <Card key={index} className="w-[330px] ">
          <CardHeader>
            <CardTitle>{item.user_metadata?.first_name || "NIL"}</CardTitle>
            <CardDescription>{item.role}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>Email: {item.email}</div>
            <div>Role: {item.user_metadata.role}</div>
            <div>Last Sign In: {item.last_sign_in_at}</div>
          </CardContent>
          <CardFooter className="">
            {/* <form action="">
              <Button type="button" variant="outline">
                Edit User
              </Button>
            </form> */}
            <form action={deleteUser}>
              <input className="hidden" name="id" value={item.id} />
              <Button type="submit" variant="destructive">
                Delete User
              </Button>
            </form>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
