import { LoginForm } from "@/components/LoginForm"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import React from "react"

type Props = {}

export default async function Login({}: Props) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (data.user != null) {
    redirect("/")
  }
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <LoginForm />
    </div>
  )
}
