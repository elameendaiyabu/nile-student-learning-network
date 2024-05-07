import { createClient } from "@/utils/supabase/server"
import React from "react"
import { TutorCard } from "./TutorCard"
import SearchBar from "./SearchBar"

export default async function Tutors() {
  const supabase = createClient()

  const { data: tutor, error } = await supabase.from("tutor").select("*")

  return (
    <div className="pt-5 sm:px-5">
      <div className=" sm:p-0 p-5">
        <h1 className="text-xl sm:text-2xl text-center mb-3">Discover Students to Learn From!</h1>
        <div className="w-full px-5 sm:px-0 flex mb-2 justify-center sm:justify-end">
          <SearchBar />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center ">
        {tutor?.map((item, index) => <TutorCard key={item.id} tutorInfo={item} />)}
      </div>
    </div>
  )
}
