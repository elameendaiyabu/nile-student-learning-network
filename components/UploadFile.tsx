"use client"

import React from "react"
import { UploadButton, UploadDropzone } from "./ui/uploadthing"
import { useToast } from "./ui/use-toast"
import { createClient } from "@/utils/supabase/client"

type Props = {}

export default function UploadFile({}: Props) {
  const { toast } = useToast()
  return (
    <div className="flex  flex-col items-center justify-between p-24">
      <UploadDropzone
        className=" hover:cursor-pointer ut-button:bg-primary ut-button:ut-uploading:after:bg-primary/50 ut-button:ut-uploading:bg-primary/50 ut-button:ut-readying:bg-primary/50 ut-button:text-secondary ut-label:text-primary"
        onUploadError={(error: Error) => {
          toast({
            description: "Error uploading file. Try again!",
          })
        }}
        onClientUploadComplete={async (res) => {
          const supabase = createClient()

          const { data, error } = await supabase.from("upload").insert([
            {
              url: res[0].url,
              name: res[0].name,
              type: res[0].type,
            },
          ])
          if (error) {
            toast({
              description: "Error Uploading File to Database",
            })
          }
          toast({
            description: "Upload Complete",
          })
        }}
        endpoint="imageUploader"
      />
    </div>
  )
}
