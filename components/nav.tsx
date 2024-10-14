import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { HistoryIcon, Plus, User2Icon, Users } from "lucide-react"
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
import { Button } from "./ui/button";
import useStudentStore from "@/store/student";

export default function Nav() {
  const { setIsOpen } = useDrawerStore()
  const { students } = useStudentStore();
  return (
    <nav className="p-4 flex justify-between items-center">
      <Button onClick={() => setIsOpen(true)} variant="outline" ><Plus className="w-4 h-4 mr-2" />Student</Button>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
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
          <DropdownMenuItem> <User2Icon className="w-4 h-4 mr-2 text-muted-foreground" /> Profile</DropdownMenuItem>
          <DropdownMenuItem> <HistoryIcon className="w-4 h-4 mr-2 text-muted-foreground" /> History</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
