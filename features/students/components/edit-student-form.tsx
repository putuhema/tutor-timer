"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
import { useCreateStudent } from "@/features/students/api/use-create-students"
import { useEffect } from "react"
import { useSheetStore } from "@/store/sheet"
import AvatarPicker from "@/components/avatar-picker"

type Props = {
  id: number
}

export default function EditStudentForm({ id }: Props) {
  const { isOpen, setIsOpen } = useSheetStore()
  const { mutate, isSuccess } = useCreateStudent()
  const form = useForm<z.infer<typeof createStudentSchema>>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      fullname: '',
      nickname: '',
      avatar: ''
    }
  })

  const onSubmit = (values: z.infer<typeof createStudentSchema>) => {
    mutate(values)
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      setIsOpen(false)
    }
  }, [isSuccess])
  return (

    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button>Add Student</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add New Student</SheetTitle>
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
                    <AvatarPicker onChange={(value: string) => {
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
