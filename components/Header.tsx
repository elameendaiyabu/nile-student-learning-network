import Link from "next/link"
import React from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleUser, Menu, Share2 } from "lucide-react"
import { ThemeSwitcher } from "./ThemeSwitcher"

type Props = {}

export default function Header({}: Props) {
  return (
    <header className="sticky z-50 top-0 flex h-16 items-center gap-4 border-b dark:border-b-foreground/20  bg-opacity-60 backdrop-blur-md px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Share2 className=" h-6 w-6" />
          <span className="sr-only">Skill Learning Network for Students</span>
        </Link>
        <Link
          href="#"
          className=" transition-colors hover:bg-black/10 dark:hover:bg-muted p-2 rounded"
        >
          Home
        </Link>
        <Link
          href="#"
          className=" transition-colors hover:bg-black/10  dark:hover:bg-muted p-2 rounded"
        >
          Saved
        </Link>
        <Link
          href="#"
          className=" transition-colors hover:bg-black/10  dark:hover:bg-muted p-2 rounded"
        >
          Popular
        </Link>
        <Link
          href="#"
          className=" transition-colors hover:bg-black/10  dark:hover:bg-muted p-2 rounded"
        >
          Reviews
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
              <Share2 className=" h-6 w-6" />
              <span className="sr-only">Skill Learning Network for Students</span>
            </Link>
            <Link href="#" className="">
              Home
            </Link>
            <Link href="#" className="">
              Saved
            </Link>
            <Link href="#" className="">
              Popular
            </Link>
            <Link href="#" className="">
              Reviews
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative"></div>
        </form>
        <ThemeSwitcher />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
