"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { createStudentSchema } from "@/features/students/schema"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useSheetStore } from "@/store/sheet"
import AvatarPicker from "@/components/avatar-picker"
import { useGetStudent } from "../api/use-get-student"
import { useEditStudent } from "../api/use-put-students"

type Props = {
  id: number;
}

const SHEET_ID = "edit-student-form"

export default function EditStudentForm({ id }: Props) {

  const { data: student } = useGetStudent((id || 0).toString())

  const { getSheet, toggleSheet } = useSheetStore()
  const { mutate, isSuccess } = useEditStudent()
  const form = useForm<z.infer<typeof createStudentSchema>>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      fullname: '',
      nickname: '',
      avatar: '',
    }
  })

  useEffect(() => {
    if (student) {
      form.setValue('fullname', student.fullname)
      form.setValue('nickname', student.nickname)
      form.setValue('avatar', student.avatar || '')
    }
  }, [student])

  const onSubmit = (values: z.infer<typeof createStudentSchema>) => {
    mutate({
      id: id,
      ...values
    })
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      toggleSheet(SHEET_ID, false)

    }
  }, [isSuccess])


  return (

    <>
      <Sheet
        open={getSheet(SHEET_ID)?.isOpen}
        onOpenChange={(open) => {
          toggleSheet(SHEET_ID, open)
        }}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Student</SheetTitle>
            <SheetDescription>
              Add students to your class
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>fullname</FormLabel>
                    <FormControl>
                      <Input placeholder="Fullname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input placeholder="Nickname" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be used as the nickname in the class
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar"
                render={(({ field }) => (
                  <FormItem>
                    <AvatarPicker value={field.value} onChange={(value: string) => {
                      form.setValue('avatar', value)
                    }} />
                  </FormItem>
                ))}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  )
}
