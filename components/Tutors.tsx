import { createClient } from "@/utils/supabase/server"
import React from "react"
import { TutorCard } from "./TutorCard"

type Props = {}

export default async function Tutors({}: Props) {
  const supabase = createClient()

  const { data: tutor, error } = await supabase.from("tutor").select("*")
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center pt-5 sm:pl-5">
      {tutor?.map((item, index) => <TutorCard key={item.id} tutorInfo={item} />)}
    </div>
  )
}
