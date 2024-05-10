"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signup(formData: FormData) {
  const supabase = createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        username: "NIL",
        about: "NIL",
        role: "user",
        profile_photo: "https://utfs.io/f/cc472175-cb4c-4d84-816a-57f3d5df1770-zd5dhh.webp",
      },
    },
  })
  if (error) {
    alert(error.message)
  }

  revalidatePath("/")
  redirect("/")
}

export async function logout() {
  const supabase = createClient()

  await supabase.auth.signOut()
  revalidatePath("/")
  redirect("/")
}

export async function login(formData: FormData) {
  const supabase = createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) {
    alert(error.message)
  }

  revalidatePath("/")
  redirect("/")
}

export async function updateUserData(formData: FormData) {
  const supabase = createClient()

  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const userName = formData.get("userName") as string
  const about = formData.get("about") as string

  const { data, error } = await supabase.auth.updateUser({
    data: {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      about: about,
    },
  })

  if (error) {
    alert(error.message)
  }

  revalidatePath("/settings/profile")
  redirect("/settings/profile")
}

export async function tutorSignUp(formData: FormData) {
  const supabase = createClient()
  const department = formData.get("department") as string
  const rate = formData.get("rate") as string
  const teaching_method = formData.get("teaching_method") as string
  const is_available = formData.get("is_available") as string
  const level = formData.get("level") as string
  const description = formData.get("description") as string
  const number = formData.get("number") as string
  const full_name = formData.get("full_name") as string

  const { data: user } = await supabase.auth.getUser()

  const { data: metadata } = await supabase.auth.updateUser({
    data: {
      role: "tutor",
      profile_photo: "https://utfs.io/f/cc472175-cb4c-4d84-816a-57f3d5df1770-zd5dhh.webp",
    },
  })

  const { data, error } = await supabase
    .from("tutor")
    .insert({
      department: department,
      rate: rate,
      teaching_method: teaching_method,
      is_available: is_available,
      level: level,
      description: description,
      number: number,
      full_name: full_name,
    })
    .eq("user_id", user.user?.id)

  if (error) {
    alert(error.message)
  }

  revalidatePath("/")
  revalidatePath("/settings/profile")
  redirect("/settings/profile")
}

export type SearchState = { data: string[] }

export async function search(prevState: SearchState, formData: FormData) {
  const supabase = createClient()

  const search = formData.get("search") as string

  const renewedSearch = search.replace(/\s+/g, "+")

  const { data, error } = await supabase
    .from("tutor")
    .select()
    .textSearch("search_tutor", renewedSearch)

  if (error) {
    alert(error.message)
  }

  return { data }
}

export async function updateSkills(array: string[], formData: FormData) {
  const supabase = createClient()

  const { data: user } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("tutor")
    .update([{ skills: array }])
    .eq("user_id", user.user?.id)
  if (data) revalidatePath("/settings/profile")
}
