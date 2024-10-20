"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormEvent, useEffect, useRef, useState } from "react"

import { useCreatePrisma } from "@/features/prisma/api/use-create-prisma"
import { calculatePrisma, formatNumber } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useGetPrisma } from "@/features/prisma/api/use-get-prisma"
import SelectOperator from "@/components/select-operator"

export default function Page() {

  const { mutate, isSuccess, isPending } = useCreatePrisma()

  const [inputQty, setInputQty] = useState("2")
  const [form, setForm] = useState({
    level: "",
    page: "",
    firstNumber: "",
    secondNumber: "",
    thirdNumber: "",
    fourthNumber: "",
    operator1: "",
    operator2: "",
    operator3: "",
    operations: "",
  })

  const inputRef = useRef<HTMLInputElement | null>(null)
  const secondInputRef = useRef<HTMLInputElement | null>(null)


  const { data } = useGetPrisma(parseInt(form.level) || 1, parseInt(form.page) || 1, (form.page && form.level) ? true : false)

  useEffect(() => {
    if (form.firstNumber.length >= 5 && secondInputRef.current) {
      secondInputRef.current.focus()
    }
  }, [form.firstNumber])



  useEffect(() => {
    if (inputRef.current && isSuccess) {
      inputRef.current.focus()
    }
  }, [inputRef, isSuccess])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const operators = [form.operator1, form.operator2, form.operator3].filter((op) => op.length > 0);
    const numbers = [
      parseInt(form.firstNumber),
      parseInt(form.secondNumber),
      parseInt(form.thirdNumber),
      parseInt(form.fourthNumber)]
      .filter((num) => !Number.isNaN(num));
    const { operation, result: answer } = calculatePrisma(parseInt(inputQty),
      operators,
      numbers)

    mutate({
      level: parseInt(form.level),
      page: parseInt(form.page),
      operators: operators.join(","),
      numbers: numbers.join(","),
      operation,
      answer,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      setForm({
        ...form,
        firstNumber: "",
        secondNumber: "",
        thirdNumber: "",
        fourthNumber: "",
        operations: ""
      })
    }
  }, [isSuccess])

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <form onSubmit={onSubmit} className="space-y-3">
        <h1>Prisma Form</h1>
        <div className="flex gap-2 items-center">
          <Select value={form.level} onValueChange={(value) => setForm({ ...form, level: value })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Level</SelectLabel>
                {[...Array(10)].map((_, index) => (
                  <SelectItem key={index} value={`${index + 1}`}>
                    Level {index + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input type="number" value={form.page} onChange={(e) => setForm({ ...form, page: e.target.value })} placeholder="page" />
          {
            parseInt(form.level) < 5 ? (
              <Select defaultValue={inputQty} value={inputQty} onValueChange={(value) => setInputQty(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Input Qty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Input(s)</SelectItem>
                  <SelectItem value="3">3 Input(s)</SelectItem>
                  <SelectItem value="4">4 Input(s)</SelectItem>
                </SelectContent>
              </Select>
            ) : null
          }
        </div>
        {
          parseInt(form.level) > 4 ? (
            <div className="flex items-center gap-4">
              <SelectOperator
                value={form.operator1}
                onValueChange={(value) => setForm({ ...form, operator1: value })}
              />
              <Input disabled={isPending} ref={inputRef} type="number" value={form.firstNumber} onChange={(e) => setForm({ ...form, firstNumber: e.target.value })} placeholder="first number" />
              <Input ref={secondInputRef} disabled={form.operator1 === "sqrt" || form.operator1 === "pow" || isPending} type="number" value={form.secondNumber} onChange={(e) => setForm({ ...form, secondNumber: e.target.value })} placeholder="second number" />
            </div>
          ) :
            <>

              {inputQty === "2" &&
                <div className="flex gap-4">
                  <SelectOperator
                    value={form.operator1}
                    onValueChange={(value) => setForm({ ...form, operator1: value })}
                  />
                  <Input
                    disabled={isPending}
                    ref={inputRef}
                    type="number"
                    value={form.firstNumber}
                    onChange={(e) => setForm({ ...form, firstNumber: e.target.value })}
                    placeholder="first number" />
                  <Input
                    disabled={isPending}
                    type="number"
                    value={form.secondNumber}
                    onChange={(e) => setForm({ ...form, secondNumber: e.target.value })}
                    placeholder="second number" />
                </div>
              }
              {inputQty === "3" &&
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <SelectOperator
                      value={form.operator1}
                      onValueChange={(value) => setForm({ ...form, operator1: value })}
                    />
                    <SelectOperator
                      value={form.operator2}
                      onValueChange={(value) => setForm({ ...form, operator2: value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Input disabled={isPending} ref={inputRef} type="number" value={form.firstNumber} onChange={(e) => setForm({ ...form, firstNumber: e.target.value })} placeholder="first number" />
                    <Input disabled={isPending} type="number" value={form.secondNumber} onChange={(e) => setForm({ ...form, secondNumber: e.target.value })} placeholder="second number" />
                    <Input disabled={isPending} type="number" value={form.thirdNumber} onChange={(e) => setForm({ ...form, thirdNumber: e.target.value })} placeholder="third number" />
                  </div>
                </div>

              }

              {inputQty === "4" &&

                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <SelectOperator
                      value={form.operator1}
                      onValueChange={(value) => setForm({ ...form, operator1: value })}
                    />
                    <SelectOperator
                      value={form.operator2}
                      onValueChange={(value) => setForm({ ...form, operator2: value })}
                    />
                    <SelectOperator
                      value={form.operator3}
                      onValueChange={(value) => setForm({ ...form, operator3: value })}
                    />

                  </div>
                  <div className="flex gap-2">
                    <Input disabled={isPending} ref={inputRef}
                      type="number"
                      value={form.firstNumber}
                      onChange={(e) => setForm({ ...form, firstNumber: e.target.value })}
                      placeholder="first number" />
                    <Input disabled={isPending} type="number" value={form.secondNumber} onChange={(e) => setForm({ ...form, secondNumber: e.target.value })} placeholder="second number" />
                    <Input disabled={isPending} type="number" value={form.thirdNumber} onChange={(e) => setForm({ ...form, thirdNumber: e.target.value })} placeholder="third number" />
                    <Input disabled={isPending} type="number" value={form.fourthNumber} onChange={(e) => setForm({ ...form, fourthNumber: e.target.value })} placeholder="fourth number" />
                  </div>
                </div>

              }
            </>
        }
        <Button type="submit" disabled={!form.level || !form.firstNumber || !form.operator1 || ((form.operator1 === "sqrt" || form.operator1 === "pow") ? false : !form.secondNumber) || isPending} className="w-full">{isPending ? <Loader2 className="animate-spin w-4 h-4" /> : "Submit"}</Button>

      </form>

      <div className="flex">
        <div className="p-2 px-6 bg-accent">
          {
            data?.slice(0, 10).map((d, i) => <div key={d.id}>{i + 1}. {d.operation} = {formatNumber(d.answer)}</div>)
          }
        </div>
        <div className="p-2 px-6">
          {
            data?.slice(10, 20).map((d, i) => <div key={d.id}>{i + 1}. {d.operation} = {formatNumber(d.answer)}</div>)
          }
        </div>
      </div>

    </div>
  )
}
