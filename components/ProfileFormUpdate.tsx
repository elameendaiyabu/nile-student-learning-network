import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { createClient } from "@/utils/supabase/server"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { updateUserData } from "@/app/auth/actions"
import { SubmitUpdatedForm } from "./ui/submit-button"

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
          <FormUpdateDialog data={data} />
          {/* <Button variant="outline">Update Profile Data</Button> */}
        </CardHeader>
        <CardContent>
          <form action="" className="sm:w-1/2">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <div className="md:w-1/2">
                <Label>First Name</Label>
                <Input
                  value={data.user?.user_metadata.first_name}
                  type="text"
                  name="firstName"
                  placeholder="John"
                  disabled
                />
              </div>
              <div className="md:w-1/2">
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
              <Input
                disabled
                value={data.user?.user_metadata.username}
                type="text"
                name="username"
                placeholder="Enter Username"
              />
            </div>
            <div className="mb-4">
              <Label>Email Address</Label>
              <Input disabled value={data.user?.email} type="email" name="email" />
            </div>
            <div className="mb-4">
              <Label>About</Label>
              <br />
              <Textarea disabled value={data.user?.user_metadata.about} name="about" />
              <CardDescription>Write a short description about yourself</CardDescription>
            </div>
            <div>
              <Label>Profile Photo</Label>
              <div className="flex gap-4">
                <div className=" w-32 h-32 bg-neutral-100 rounded-full mt-4"></div>
                <div className="flex items-center">
                  <Button type="button">Change Picture</Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function FormUpdateDialog({ data }: { data: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={updateUserData}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">First Name</Label>
              <Input
                name="firstName"
                defaultValue={data.user?.user_metadata.first_name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Last Name</Label>
              <Input
                name="lastName"
                defaultValue={data.user?.user_metadata.last_name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Username</Label>
              <Input
                name="userName"
                defaultValue={data.user?.user_metadata.username}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">About</Label>
              <Textarea
                name="about"
                defaultValue={data.user?.user_metadata.about}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <SubmitUpdatedForm />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
