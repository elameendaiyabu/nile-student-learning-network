import ProfileFormUpdate from "@/components/ProfileFormUpdate"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import React from "react"

type Props = {}

export default async function Profile({}: Props) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (data.user == null) {
    redirect("/auth/signup")
  }

  return (
    <div className="w-full">
      <ProfileFormUpdate />
    </div>
  )
}
