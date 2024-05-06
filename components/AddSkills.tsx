"use client"

import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Plus, X } from "lucide-react"
import { updateSkills } from "@/app/actions"
import { useFormStatus } from "react-dom"
import { createClient } from "@/utils/supabase/client"

type Data = { skills: any }[] | null

export default function AddSkills() {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [skillsArray, setSkillsArray] = useState<string[]>([])
  const [skill, setSkill] = useState<string>("")
  const { pending } = useFormStatus()
  const [mySkills, setMySkills] = useState<Data>([])

  useEffect(() => {
    async function getSkills() {
      const supabase = createClient()

      const { data: user } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from("tutor")
        .select("skills")
        .eq("user_id", user.user?.id)

      setMySkills(data)
    }

    getSkills()
  }, [skill, skillsArray])

  function addSkill() {
    setSkillsArray([...skillsArray, skill])
    setSkill("")
  }

  const skills = updateSkills.bind(null, skillsArray)

  return (
    <form action={skills}>
      {isAdding && (
        <div className="flex gap-2">
          <Input
            className="mb-2"
            type="text"
            onChange={(e) => setSkill(e.target.value)}
            value={skill}
          />

          <Button
            onClick={() => {
              addSkill()
            }}
          >
            <Plus />
          </Button>
          <Button onClick={() => setIsAdding(false)}>
            <X />
          </Button>
        </div>
      )}
      {mySkills?.map((item, index) => (
        <ul key={index}>
          {item.skills?.map((skill: string, skillIndex: number) => (
            <li className="list-inside list-disc" key={skillIndex}>
              {skill}
            </li>
          ))}
        </ul>
      ))}
      {isAdding || (
        <Button
          className="mt-2"
          onClick={() => {
            setIsAdding(true)
          }}
          type="submit"
        >
          Upload Skills
        </Button>
      )}

      {/* {isAdding && (
        <Button className="mt-2" type="submit" disabled={pending}>
          {pending ? "Updating Skills" : "Add Skills"}
        </Button>
      )} */}
    </form>
  )
}
