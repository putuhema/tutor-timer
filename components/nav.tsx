"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Book, Crown, HistoryIcon, Home, Plus, Timer, TimerIcon, User, User2Icon, UserRoundPlus, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "./ui/badge";
import { useDrawerStore } from "@/store/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Timer",
    href: '/',
    icon: Timer
  },
  {
    title: "Progams",
    href: "/programs",
    icon: Book
  },
  {
    title: "Profile",
    href: '/profile',
    icon: User
  },
  // {
  //   title: "History",
  //   href: "/history",
  //   icon: HistoryIcon
  // }
]


const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export default function Nav() {
  const pathname = usePathname();
  const { setIsOpen } = useDrawerStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");


  return (
    <nav className="p-4 flex justify-end items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/putuhema.png" alt="@putuhema" />
            <AvatarFallback>PM</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[200px]">
          <DropdownMenuLabel>
            <p>Putu Mahendra</p>
            <Badge variant="outline">Teacher</Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpen(true)}> <Users className="w-4 h-4 mr-2 text-muted-foreground" /> Add New Student</DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link href="/programs">
            <DropdownMenuItem>
              <Book className="w-4 h-4 mr-2 text-muted-foreground" /> Programs
            </DropdownMenuItem>
          </Link>

          <Link href="/dashboard">
            <DropdownMenuItem>
              <Book className="w-4 h-4 mr-2 text-muted-foreground" /> Dashboard
            </DropdownMenuItem>
          </Link>
          <Link href="/">
            <DropdownMenuItem> <TimerIcon className="w-4 h-4 mr-2 text-muted-foreground" /> Timer</DropdownMenuItem>
          </Link>
          <DropdownMenuItem> <User2Icon className="w-4 h-4 mr-2 text-muted-foreground" /> Profile</DropdownMenuItem>
          <DropdownMenuItem> <HistoryIcon className="w-4 h-4 mr-2 text-muted-foreground" /> History</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
