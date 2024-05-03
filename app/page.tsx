import { TutorCard } from "@/components/TutorCard"
import { createClient } from "@/utils/supabase/server"

export default async function Home() {
  const supabase = createClient()

  const { data, error } = await supabase.from("tutor").select("*")
  console.log(data)
  return (
    <main className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center pt-5 sm:pl-5">
      {data?.map((item, index) => <TutorCard key={item.id} tutorInfo={item} />)}
    </main>
  )
}
