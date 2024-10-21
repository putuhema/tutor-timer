"use client"


import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { EnterIcon } from "@radix-ui/react-icons";
import { FormEvent, useEffect, useState } from "react";
import { calculatePrisma } from "@/lib/utils";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditPrisma } from "../api/use-edit-prisma";
import { useDeletePrismaItem } from "../api/use-delete-prisma-item";


type Props = {
  index: number;
  align: "end" | "center" | "start";
  data: {
    id: number;
    page: number;
    level: number;
    operators: string;
    numbers: string;
    operation: string;
    answer: number;
  }
}


export default function PrismaItem({ align, index, data }: Props) {
  const [open, setOpen] = useState(false)
  const [numbers, setNumbers] = useState(data.numbers)

  const { mutate, isSuccess, isPending } = useEditPrisma(data.id)
  const { mutate: deleteMutation } = useDeletePrismaItem()


  useEffect(() => {
    if (isPending) {
      setOpen(true)
    }
  }, [isPending])


  useEffect(() => {
    if (isSuccess) {
      setOpen(false)
    }
  }, [isSuccess])


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const numbersArray = numbers.split(",").map((num) => parseInt(num))
    const { result, operation } = calculatePrisma(numbersArray.length, data.operators.split(","), numbersArray)

    mutate({
      answer: result,
      operation,
      numbers,
      operators: data.operators,
      level: data.level,
      page: data.page,
    })
  }

  const onDelete = () => {
    deleteMutation({ param: { id: data.id.toString() } })
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <button className='flex gap-2 items-center'>
            <p className="text-sm italic">
              <span className="mr-2 inline-block">{index}.</span>
              {data.operation}
            </p>
            <span>=</span>
            <span className="text-blue-500 font-bold">
              {data.answer}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[150px]  backdrop-blur-md space-y-2" align={align}>
          <form onSubmit={onSubmit} className="flex gap-4 items-center">
            <Input
              className="w-[110px]"
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)} />
            <Button onClick={onDelete} size="icon" variant="outline" type="button"><Trash className="h-4 w-4 text-muted-foreground" /></Button>
          </form>
          <div className="text-xs text-muted-foreground space-y-2">
            <p><span className="border rounded-md p-1 px-2">↵</span> to Accept</p>
            <p><span className="border rounded-md p-1">Esc</span> to Cancel</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
