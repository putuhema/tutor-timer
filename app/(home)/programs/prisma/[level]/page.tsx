"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { PrismaContent } from "@/components/prisma-content"
import BackButton from "@/components/back-button"


export default function Page({ params }: { params: { level: string } }) {
  const [page, setPage] = useState("")
  const [selectedPage, setSelectedPage] = useState(0)
  const [open, setOpen] = useState(false)

  const onSelectPage = (page: number) => {
    setSelectedPage(page)
  }

  const handleOnClick = (page: number) => {
    setOpen(!open)
    setSelectedPage(page)
  }

  return (
    <>
      <div className="space-y-4 pb-20">
        <BackButton link="/programs/prisma" title="Prisma" />
        <h2 className="text-lg font-bold">Prisma level {params.level} </h2>
        <div className="flex gap-2">
          <Input type="number" onChange={(e) => setPage(e.target.value)} value={page} name="level" placeholder="Search page number" />
          {
            page && (
              <Button onClick={() => setPage("")}>Clear</Button>
            )
          }
        </div>
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-5 lg:gap-2">
          {
            page && parseInt(page) > 0 ?
              <Button onClick={() => handleOnClick(parseInt(page))} className="border rounded-lg py-6 px-2" variant="outline" key={`page-${page}`}>Page {page}</Button>

              :
              <>
                {
                  [...Array(50)].map((_, index) => (
                    <Button onClick={() => handleOnClick(index + 1)} className="border rounded-lg py-6 px-2" variant="outline" key={`page-${index}`}>Page {index + 1}</Button>
                  ))
                }
              </>
          }
        </div>
      </div>

      <Drawer onOpenChange={setOpen} open={open}>
        <DrawerContent className="h-[80%]">
          <DrawerHeader>
            <DrawerTitle>Prisma Level {params.level}</DrawerTitle>
            <DrawerDescription>Page {selectedPage}</DrawerDescription>
          </DrawerHeader>
          <div className="w-full flex justify-center items-center p-4 px-8 overflow-y-auto" >
            <PrismaContent page={selectedPage} level={parseInt(params.level)} selectPage={onSelectPage} selectedPage={selectedPage} />
          </div>
        </DrawerContent>
      </Drawer>
    </>

  )
}
