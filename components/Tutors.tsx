import { createClient } from "@/utils/supabase/server"
import React from "react"
import { TutorCard } from "./TutorCard"
import SearchBar from "./SearchBar"

export default async function Tutors() {
  const supabase = createClient()

  const { data: tutor, error } = await supabase.from("tutor").select("*")

  console.log(tutor)
  return (
    <div className="pt-5 sm:px-5">
      <div className="w-full px-5 sm:px-0 flex mb-2 justify-end">
        <SearchBar />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center ">
        {tutor?.map((item, index) => <TutorCard key={item.id} tutorInfo={item} />)}
      </div>
    </div>
  )
}
