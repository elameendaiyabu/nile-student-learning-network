"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./button"
import { useToast } from "./use-toast"

export function SubmitLoginButton() {
  const { pending } = useFormStatus()
  const { toast } = useToast()

  return (
    <Button
      className="w-full"
      type="submit"
      onClick={() => {
        toast({
          description: "Sign In Successful",
        })
      }}
      disabled={pending}
    >
      {pending ? "Signing in" : "Sign in"}
    </Button>
  )
}

export function SubmitSignupButton() {
  const { pending } = useFormStatus()
  const { toast } = useToast()

  return (
    <Button
      className="w-full"
      type="submit"
      onClick={() => {
        toast({
          description: "Sign Up Successful. Verify Email and Sign In",
        })
      }}
      disabled={pending}
    >
      {pending ? "Creating Account" : " Create an account"}
    </Button>
  )
}

export function SubmitUpdatedForm() {
  const { pending } = useFormStatus()
  const { toast } = useToast()

  return (
    <Button
      className="w-full"
      type="submit"
      onClick={() => {
        toast({
          description: "Profile Updated",
        })
      }}
      disabled={pending}
    >
      {pending ? "saving changes" : "Save changes"}
    </Button>
  )
}
export function SubmitTutorSignupForm() {
  const { pending } = useFormStatus()
  const { toast } = useToast()

  return (
    <Button
      className="w-full"
      type="submit"
      onClick={() => {
        toast({
          description: "Tutor Profile Created. Add Skills in Profile Settings!",
        })
      }}
      disabled={pending}
    >
      {pending ? "Registering" : "Register"}
    </Button>
  )
}
