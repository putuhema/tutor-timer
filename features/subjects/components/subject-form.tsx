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



import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useSheetStore } from "@/store/sheet"
import { useCreateSubject } from "../api/use-create-subject"
import { createSubjectSchema } from "../schema"
import { Textarea } from "@/components/ui/textarea"

export default function SubjectForm() {
  const { isOpen, setIsOpen } = useSheetStore()
  const { mutate, isSuccess } = useCreateSubject()
  const form = useForm<z.infer<typeof createSubjectSchema>>({
    resolver: zodResolver(createSubjectSchema),
    defaultValues: {
      name: '',
      description: '',
    }
  })

  const onSubmit = (values: z.infer<typeof createSubjectSchema>) => {
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
        <SheetTrigger>Add Subject</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add New Subject</SheetTitle>
            <SheetDescription>
              Add a new subject
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description <span className="text-xs text-muted-foreground">(optional)</span> </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
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
