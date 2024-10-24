"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Book, HistoryIcon, Timer, TimerIcon, User, User2Icon, UserRoundPlus, Users } from "lucide-react"
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

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardIcon } from "@radix-ui/react-icons";


export default function Nav() {
  const pathname = usePathname();
  const { setIsOpen } = useDrawerStore();

  const pagetitle = () => {
    switch (pathname) {
      case "/":
        return "Timer";
      case "/programs":
        return "Programs";
      case "/profile":
        return "Profile";
      case "/form":
        return "Prisma Form";
      default:
        return "Timer";
    }
  }


  return (
    <nav className="p-4 flex justify-between items-center">
      <p className="font-bold">{pagetitle()}</p>
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
          {
            pathname === "/" && (
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <Users className="w-4 h-4 mr-2 text-muted-foreground" /> Add New Student</DropdownMenuItem>
            )
          }
          <DropdownMenuSeparator />
          <Link href="/programs">
            <DropdownMenuItem>
              <Book className="w-4 h-4 mr-2 text-muted-foreground" /> Programs
            </DropdownMenuItem>
          </Link>
          <Link href="/">
            <DropdownMenuItem> <TimerIcon className="w-4 h-4 mr-2 text-muted-foreground" /> Timer</DropdownMenuItem>
          </Link>
          <Link href="/dashboard/students">
            <DropdownMenuItem> <DashboardIcon className="w-4 h-4 mr-2 text-muted-foreground" /> Dashboard(student)</DropdownMenuItem>
          </Link>
          <DropdownMenuItem> <User2Icon className="w-4 h-4 mr-2 text-muted-foreground" /> Profile</DropdownMenuItem>
          <DropdownMenuItem> <HistoryIcon className="w-4 h-4 mr-2 text-muted-foreground" /> History</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
