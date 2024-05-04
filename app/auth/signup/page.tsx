import { SignUp } from "@/components/SignUpForm"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import React from "react"

type Props = {}

export default async function Signup({}: Props) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (data.user != null) {
    redirect("/")
  }
  return (
    <div>
      <SignUp />
    </div>
  )
}
