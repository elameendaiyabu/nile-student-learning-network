import TutorSignUp from "@/components/TutorSignUp"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import React from "react"

type Props = {}

export default async function page({}: Props) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (data.user == null) {
    redirect("/auth/signup")
  }

  if (data.user.user_metadata.role == "tutor") {
    redirect("/")
  }

  return (
    <div>
      <TutorSignUp />
    </div>
  )
}
