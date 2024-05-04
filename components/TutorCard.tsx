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
import { createClient } from "@supabase/supabase-js"
import Image from "next/image"

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

const skills = [""]

export function TutorCard({ tutorInfo }: { tutorInfo: tutorInfo }) {
  return (
    <div>
      <div className="hidden md:block">
        <Dialog>
          <DialogTrigger asChild>
            <CardDialog tutorInfo={tutorInfo} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[720px]">
            <DialogHeader>
              <DialogTitle>{tutorInfo.full_name}</DialogTitle>
              <DialogDescription>{tutorInfo.description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" defaultValue="@peduarte" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                <MessageCircleMore />
                Contact Me!
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <CardDialog tutorInfo={tutorInfo} />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}

export function CardDialog({ tutorInfo }: { tutorInfo: tutorInfo }) {
  return (
    <Card className={cn("w-[330px] hover:cursor-pointer ")}>
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
          >
            {/* <div className=" h-24 w-24">
              <Image
                src={tutorInfo.profile_picture}
                alt=""
                width={100}
                height={100}
                className=" rounded-3xl border border-foreground"
              />
            </div> */}
          </div>
          <div>
            <p>{tutorInfo.full_name}</p>
            <CardDescription>
              <p>{tutorInfo.department}</p>
              <div>
                <Skills skills={skills} />
              </div>
            </CardDescription>
          </div>
        </div>
      </CardContent>
      <CardFooter className=" flex justify-end">
        <Button className="dark:bg-green-800 dark:text-white dark:hover:bg-green-700">
          See More
        </Button>
      </CardFooter>
    </Card>
  )
}

export function Skills({ skills }: { skills: string[] }) {
  return (
    <div className=" flex gap-1 flex-wrap">
      {skills.map((item, index: number) => (
        <SkillTab key={index} skill={item} />
      ))}
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
