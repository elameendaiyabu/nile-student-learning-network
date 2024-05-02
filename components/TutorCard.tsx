import { Star } from "lucide-react"

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

type CardProps = React.ComponentProps<typeof Card>

const skills = ["python", "dance", "music", "great", "youth", "threat"]

export function TutorCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[350px] ", className)} {...props}>
      <CardHeader>
        <CardDescription className=" flex justify-between ">
          <p className=" flex gap-2 ">
            <Star className="text-green-800 fill-green-800" />
            <span className="mt-[0.2rem]">5.0/5 (10 jobs)</span>
          </p>
          <p>💲85/hr</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className=" w-full flex gap-2 ">
          <div className="w-24 flex items-center ">
            <div className=" h-24 w-24 rounded-full bg-neutral-400"></div>
          </div>
          <div>
            <p>El-ameen Daiyabu</p>
            <CardDescription>
              <p>Computer Science</p>
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
