"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useGetStudents } from '../api/use-get-students'
import Avatar from '@/components/avatar'
import { Delete, Ellipsis, PenLine } from "lucide-react"
import { useSheetStore } from "@/store/sheet"
import { useRouter } from "next/navigation"

export default function StudentTable() {
  const router = useRouter()
  const { toggleSheet } = useSheetStore()
  const { data: students } = useGetStudents()


  return (
    <Table className='w-full'>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Fullname</TableHead>
          <TableHead>Nickname</TableHead>
          <TableHead className="text-center">Avatar</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='w-full'>
        {
          students && students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.id}</TableCell>
              <TableCell>{student.fullname}</TableCell>
              <TableCell>{student.nickname}</TableCell>
              <TableCell className="flex justify-center">
                <Avatar currentAvatar={student.avatar!} />
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={
                      () => {
                        toggleSheet("edit-student-form", true)
                        router.push(`/dashboard/students?id=${student.id}`)
                      }
                    }>
                      <PenLine className="w-4 h-4 mr-2" />
                      Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500 hover:text-red-500/80 focus:text-red-500/80">
                      <Delete className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}
