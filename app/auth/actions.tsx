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
      },
    },
  })
  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/")
  redirect("/")
}

export async function logout() {
  const supabase = createClient()

  await supabase.auth.signOut()
  revalidatePath("/")
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
    throw new Error(error.message)
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
    throw new Error(error.message)
  }

  revalidatePath("/profile")
  redirect("/profile")
}
