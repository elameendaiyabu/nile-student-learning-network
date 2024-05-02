import { Star, UploadIcon, User } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"

type Props = {}

export default function ProfileNavBar({}: Props) {
  return (
    <div className="relative">
      <aside className="fixed left-0 min-h-full z-10 w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <ToggleGroup className="flex flex-col " type="single">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/profile"
                    className="flex h-9 w-9 mb-3 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <ToggleGroupItem value="user">
                      <User className="h-5 w-5" />
                    </ToggleGroupItem>
                    <span className="sr-only">Profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Profile</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 mb-3 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <ToggleGroupItem value="upload">
                      <UploadIcon className="h-5 w-5" />
                    </ToggleGroupItem>
                    <span className="sr-only">Upload</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Upload</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <ToggleGroupItem value="rating">
                      <Star className="h-5 w-5" />
                    </ToggleGroupItem>
                    <span className="sr-only">Rating</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Rating</TooltipContent>
              </Tooltip>
            </ToggleGroup>
          </TooltipProvider>
        </nav>
      </aside>
    </div>
  )
}
