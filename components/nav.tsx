import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Crown, HistoryIcon, Home, Plus, User, User2Icon, UserRoundPlus, Users } from "lucide-react"
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


const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export default function Nav() {
  const { setIsOpen } = useDrawerStore()

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return <>
      <div className="fixed top-0 w-full bg-white z-50 shadow-sm">
        <div className="w-full flex justify-between items-center px-8 py-4">
          <div className={cn("px-4 p-2 font-bold text-xl tracking-wider", pacifico.className)}>Tutor.<span className="text-blue-500">me</span> </div>
          <Button onClick={() => setIsOpen(true)} variant="default"><UserRoundPlus className="w-6 h-6" /></Button>
        </div>
      </div>
      {/* <nav className="fixed bottom-0 w-full z-50">
        <div className="w-full rounded-t-xl bg-white border">
          <ul className="flex justify-between group gap-4 items-center w-full p-2 px-8">
            <li className="flex items-center flex-col">
              <div className="p-2 border rounded-lg">
                <Home />
              </div>
              <p className="text-center text-xs text-muted-foreground">Home</p>
            </li>
            <li className="flex items-center flex-col"><Crown />
              <p className="text-center text-xs">Leaderboard</p>
            </li>
            <li className="flex items-center flex-col"><HistoryIcon />
              <p className="text-center text-xs">History</p>
            </li>

            <li className="flex items-center flex-col"><User />
              <p className="text-center text-xs">Profile</p>
            </li>
          </ul>
        </div>
      </nav> */}
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