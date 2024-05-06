import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { SubmitTutorSignupForm } from "./ui/submit-button"
import { tutorSignUp } from "@/app/actions"
import { createClient } from "@/utils/supabase/server"

type Props = {}

export default async function TutorSignUp({}: Props) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  return (
    <div className="p-4 flex flex-col gap-5">
      <h1 className="text-center text-xl md:text-3xl">
        Hey El-ameen. Ready to share what you know with other students?
      </h1>
      <p className="text-muted-foreground text-center text-lg md:text-2xl">
        Fill the options below to register as a tutor.
      </p>
      <div>
        <form action={tutorSignUp}>
          <div className=" w-full flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle>Professional</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>
                      Experience Level{" "}
                      <span className="text-muted-foreground">
                        (beginner, intermediate, or advance)
                      </span>
                    </Label>
                    <Input name="level" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Hourly Rate</Label>
                    <Input name="rate" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>
                      Teaching Method{" "}
                      <span className="text-muted-foreground">(online or physical)</span>
                    </Label>
                    <Input name="teaching_method" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>
                      Available for Work?{" "}
                      <span className="text-muted-foreground">enter true or false.</span>
                    </Label>
                    <Input name="is_available" type="text" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Full name</Label>
                    <Input
                      name="full_name"
                      defaultValue={`${data.user?.user_metadata.first_name} ${data.user?.user_metadata.last_name}`}
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Department</Label>
                    <Input name="department" type="text" />
                  </div>
                  {/* <div className="flex flex-col gap-2">
                    <Label>Skills</Label>
                    <Input name="skills" type="text" />
                  </div> */}
                  <div className="flex flex-col gap-2">
                    <Label>Phone Number</Label>
                    <Input name="number" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Description</Label>
                    <Textarea name="description" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <SubmitTutorSignupForm />
        </form>
      </div>
    </div>
  )
}
