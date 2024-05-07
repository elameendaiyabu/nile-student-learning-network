"use client"

import { SearchState, search } from "@/app/actions"
import React, { useState } from "react"
import { useFormState } from "react-dom"
import { Input } from "./ui/input"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"

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
            <Card className="mt-2" key={index}>
              <CardHeader>
                {item.full_name}
                <Link href={`https://wa.me/234${item.number.slice(1)}`}>
                  <Button className=" mt-1">Contact</Button>
                </Link>
              </CardHeader>

              {/* {item.number} */}
            </Card>
          ))}
        </>
      )}
    </form>
  )
}
