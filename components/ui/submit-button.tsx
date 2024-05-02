"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./button"

export function SubmitLoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? "Signing in" : "Sign in"}
    </Button>
  )
}

export function SubmitSignupButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? "Creating Account" : " Create an account"}
    </Button>
  )
}
