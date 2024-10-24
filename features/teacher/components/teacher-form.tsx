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

import { createTeacherSchema } from "@/features/teacher/schema"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useSheetStore } from "@/store/sheet"
import { useCreateTeacher } from "../api/use-create-teacher"

const SHEET_ID = 'teacher-form'

export default function TeacherForm() {
  const { getSheet, toggleSheet } = useSheetStore()
  const { mutate, isSuccess } = useCreateTeacher()

  const form = useForm<z.infer<typeof createTeacherSchema>>({
    resolver: zodResolver(createTeacherSchema),
    defaultValues: {
      fullname: '',
      nickname: '',
      phone: '',
      email: '',
    }
  })

  const onSubmit = (values: z.infer<typeof createTeacherSchema>) => {
    mutate(values)
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      toggleSheet(SHEET_ID, false)
    }
  }, [isSuccess])
  return (

    <>
      <Sheet open={getSheet(SHEET_ID)?.isOpen} onOpenChange={(value) => toggleSheet(SHEET_ID, value)}>
        <SheetTrigger>Add Student</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add New Teacher</SheetTitle>
            <SheetDescription>
              Add teacher to your class
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormDescription>
                      ex. (+62) 812-3456-7890
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  )
}
