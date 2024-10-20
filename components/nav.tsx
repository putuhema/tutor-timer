"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Book, Crown, HistoryIcon, Home, Plus, Timer, User, User2Icon, UserRoundPlus, Users } from "lucide-react"
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
  // {
  //   title: "Leaderboard",
  //   href: '/leaderboard',
  //   icon: Crown
  // },
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

  if (!isDesktop) {
    return <>
      <div className="fixed top-0 w-full bg-white z-50 shadow-sm">
        <div className="w-full flex justify-between items-center px-8 py-4">
          <div className={cn("px-4 p-2 font-bold text-xl tracking-wider", pacifico.className)}>Tutor.<span className="text-blue-500">me</span> </div>
          {
            pathname === '/' && (
              <Button onClick={() => setIsOpen(true)} variant="default"><UserRoundPlus className="w-6 h-6" /></Button>
            )
          }
        </div>
      </div>
      <nav className="fixed bottom-0 w-full z-50">
        <div className="w-full rounded-t-xl bg-white border">
          <ul className="flex justify-around group gap-4 items-center w-full p-2 px-8">
            {
              links.map((link) => (
                <Link href={link.href} key={link.title}>
                  <li className={cn("flex items-center flex-col group")}>
                    <div className={cn("p-2 border rounded-lg hover:bg-accent", pathname === link.href ? "bg-accent border-blue-500 [&>svgs]:text-blue-500" : "")}>
                      <link.icon className="w-6 h-6" />
                    </div>
                    <p className="text-center text-xs text-muted-foreground">{link.title}</p>
                  </li>
                </Link>
              ))
            }
          </ul>
        </div>
      </nav>
    </>
  }

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
          <DropdownMenuItem> <Crown className="w-4 h-4 mr-2 text-muted-foreground" /> Leaderboard</DropdownMenuItem>
          <DropdownMenuItem> <User2Icon className="w-4 h-4 mr-2 text-muted-foreground" /> Profile</DropdownMenuItem>
          <DropdownMenuItem> <HistoryIcon className="w-4 h-4 mr-2 text-muted-foreground" /> History</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
