import TutorSignUp from "@/components/TutorSignUp"
import { createClient } from "@/utils/supabase/server"
import React from "react"

type Props = {}

export default async function page({}: Props) {
  return (
    <div>
      <TutorSignUp />
    </div>
  )
}
