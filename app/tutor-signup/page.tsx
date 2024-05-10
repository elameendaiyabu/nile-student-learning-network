import TutorSignUp from "@/components/TutorSignUp"
import React from "react"

type Props = {}

export default async function page({}: Props) {
  return (
    <div>
      <TutorSignUp />
    </div>
  )
}
