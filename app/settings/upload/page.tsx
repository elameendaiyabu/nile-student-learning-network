import UploadFile from "@/components/UploadFile"
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
  return (
    <div className=" pl-16 pt-2 w-full">
      <UploadFile />
    </div>
  )
}
