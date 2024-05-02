import UploadFile from "@/components/UploadFile"
import React from "react"

type Props = {}

export default function page({}: Props) {
  return (
    <div className=" pl-16 pt-2 w-full">
      <UploadFile />
    </div>
  )
}
