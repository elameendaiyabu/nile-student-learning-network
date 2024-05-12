import { MessageCircleMore, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Separator } from "./ui/separator"
import PostedResources, { PostedResourcesMobile } from "./PostedResources"
import Link from "next/link"
import addComment from "@/app/actions"
import { createClient } from "@/utils/supabase/server"
import { SubmitComment } from "./ui/submit-button"

interface tutorInfo {
  number: string
  full_name: string
  description: string
  department: string
  skills: string[]
  teaching_method: string
  rate: string
  level: string
  is_available: boolean
  user_id: string
  profile_picture: string
}

export function TutorCard({ tutorInfo }: { tutorInfo: tutorInfo }) {
  return (
    <div>
      <Card className={cn("w-[330px] sm:w-[375px] ")}>
        <CardHeader>
          <CardDescription className=" flex justify-between ">
            <p className=" flex gap-2 ">
              <Star className="text-green-800 fill-green-800" />
              <span className="mt-[0.2rem]">{tutorInfo.level}</span>
            </p>
            <p>💲{tutorInfo.rate}/hr</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" w-full flex gap-2 ">
            <div
              style={{ backgroundImage: `url(${tutorInfo.profile_picture})` }}
              className="w-28 h-28 bg-center bg-cover rounded-full bg-no-repeat flex  items-center "
            ></div>
            <div>
              <p>{tutorInfo.full_name}</p>
              <CardDescription>
                <p>{tutorInfo.department}</p>
                <div>
                  <Skills skills={tutorInfo.skills} />
                </div>
              </CardDescription>
            </div>
          </div>
        </CardContent>
        <CardFooter className=" flex justify-between">
          <Comments tutorInfo={tutorInfo} />
          <DisplayDialog tutorInfo={tutorInfo} />
        </CardFooter>
      </Card>
    </div>
  )
}

export async function DisplayDialog({ tutorInfo }: { tutorInfo: tutorInfo }) {
  const newNumber = 234 + tutorInfo.number.slice(1)

  return (
    <div>
      <div className="hidden md:block">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="dark:bg-green-800 dark:text-white dark:hover:bg-green-700">
              See More
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[960px] ">
            <DialogHeader>
              <DialogTitle>{tutorInfo.full_name}</DialogTitle>
              <DialogDescription className=" flex justify-between">
                <div>Description: {tutorInfo.description}</div>
                <div>{tutorInfo.department}</div>
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <span className=" flex items-center text-xl">Skills: </span>
                <ul className=" flex gap-2">
                  {tutorInfo.skills?.map((item, index) => (
                    <li className=" bg-muted p-2 rounded-md" key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>{tutorInfo.level}</div>
            </div>
            <Separator />
            <div>
              <PostedResources id={tutorInfo.user_id} />
            </div>
            <DialogFooter>
              <Link href={`https://wa.me/${newNumber}`} target="_blank">
                <Button>
                  <MessageCircleMore />
                  Contact Me!
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="dark:bg-green-800 dark:text-white dark:hover:bg-green-700">
              See More
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>{tutorInfo.full_name}</DrawerTitle>
              <DrawerDescription>Description: {tutorInfo.description}</DrawerDescription>
              <div className="text-muted-foreground">
                <div>Level: {tutorInfo.level}</div>
                <div>Department: {tutorInfo.department}</div>
              </div>
              <div>
                <div className="flex gap-2">
                  <span className=" flex items-center text-xl">Skills: </span>
                  <ul className=" flex gap-2 flex-wrap">
                    {tutorInfo.skills?.map((item, index) => (
                      <li className=" bg-muted p-2 rounded-md" key={index}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Separator />
            </DrawerHeader>
            <PostedResourcesMobile id={tutorInfo.user_id} />

            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Link href={`https://wa.me/${newNumber}`} target="_blank">
                  <Button>
                    <MessageCircleMore />
                    Contact Me!
                  </Button>
                </Link>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}

interface Comment {
  id: number
  created_at: string
  comment: string
  tutor_id: string
}

export async function Comments({ tutorInfo }: { tutorInfo: tutorInfo }) {
  const addComments = addComment.bind(null, tutorInfo.user_id)

  const supabase = createClient()

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("tutor_id", tutorInfo.user_id)

  return (
    <div>
      <div className="hidden md:block">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Comments</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[960px] ">
            <DialogHeader>
              <DialogTitle>Comments on {tutorInfo.full_name}</DialogTitle>
            </DialogHeader>
            <Separator />
            <div className=" h-96 overflow-auto">
              <div>
                {data?.map((item: Comment) => (
                  <p className="p-3 bg-muted rounded mb-1" key={item.id}>
                    {item.comment}
                  </p>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <form action={addComments} className=" flex gap-3">
                <Input
                  type="text"
                  name="comment"
                  placeholder={`post reviews on ${tutorInfo.full_name}...`}
                />
                <SubmitComment />
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">See More</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left"></DrawerHeader>
            <Separator />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}

export function Skills({ skills }: { skills: string[] }) {
  return (
    <div className=" flex gap-1 flex-wrap">
      {skills?.map((item, index: number) => <SkillTab key={index} skill={item} />)}
    </div>
  )
}

export function SkillTab({ skill }: { skill: string }) {
  return (
    <div className="dark:bg-neutral-900 bg-neutral-200 text-black dark:text-white/65 p-2 rounded-2xl text-center mt-2">
      {skill}
    </div>
  )
}
