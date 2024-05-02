import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { createClient } from "@/utils/supabase/server"

type Props = {}

export default async function ProfileFormUpdate({}: Props) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  return (
    <div className=" pl-16 pr-2 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This information will be displayed publicly so be careful what you share.
          </CardDescription>
          {/* <Button variant="outline">Update Profile Data</Button> */}
        </CardHeader>
        <CardContent>
          <form action="" className="sm:w-1/2">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <div className="w-1/2">
                <Label>First Name</Label>
                <Input
                  value={data.user?.user_metadata.first_name}
                  type="text"
                  name="firstName"
                  placeholder="John"
                  disabled
                />
              </div>
              <div className="w-1/2">
                <Label>Last Name</Label>
                <Input
                  value={data.user?.user_metadata.last_name}
                  type="text"
                  name="lastName"
                  placeholder="doe"
                  disabled
                />
              </div>
            </div>
            <div className="mb-4">
              <Label>Username</Label>
              <Input type="text" name="username" placeholder="Enter Username" />
            </div>
            <div className="mb-4">
              <Label>Email Address</Label>
              <Input disabled value={data.user?.email} type="email" name="email" />
            </div>
            <div className="mb-4">
              <Label>About</Label>
              <br />
              <Textarea name="about" placeholder="write a short description about yourself" />
            </div>
            <div>
              <Label>Profile Photo</Label>
              <div className="flex gap-4">
                <div className=" w-32 h-32 bg-neutral-100 rounded-full mt-4"></div>
                <div className="flex items-center">
                  <Button>Change Picture</Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
