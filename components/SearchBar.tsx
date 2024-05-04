"use client"

import { SearchState, search } from "@/app/actions"
import React, { useState } from "react"
import { useFormState } from "react-dom"
import { Input } from "./ui/input"
import { Search } from "lucide-react"

type Props = {}

export default function SearchBar({}: Props) {
  const data = [] // Declare the variable 'data'
  const [state, formAction] = useFormState(search, [])
  const [searchValue, setSearchValue] = useState<string>("a")

  let datas = state.data || []

  return (
    <form action={formAction} className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={(e) => {
          setSearchValue(e.target.value)
        }}
        name="search"
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
      {searchValue == "" ? (
        (datas = [])
      ) : (
        <>
          {datas.map((item, index) => (
            <p key={index}>{item.full_name}</p>
          ))}
        </>
      )}
    </form>
  )
}
