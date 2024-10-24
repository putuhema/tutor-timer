"use client"

import { useEffect, useRef, useState } from "react"
import { formatTime } from "@/lib/utils"
import { usePatchSessionStudent } from "../api/use-patch-session-student"
import { toast } from "sonner"

type Props = {
  endTime: Date
  subjectTimeLogId: number;
  status: string;
}

export default function TimeRemaining({ subjectTimeLogId, endTime, status }: Props) {
  const { mutate } = usePatchSessionStudent()
  const timer = useRef<NodeJS.Timeout>()
  const [timeRemaining, setTimeRemaining] = useState<number>(1)
  const hasMutate = useRef(false)

  useEffect(() => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()
    const newTimeRemaining = Math.ceil(diff / 1000)
    setTimeRemaining(newTimeRemaining)
  }, [endTime])



  useEffect(() => {
    if (timeRemaining <= 0 && status === "IN_PROGRESS" && !hasMutate.current) {
      mutate({
        id: subjectTimeLogId.toString(),
      })
      hasMutate.current = true
    }
  }, [timeRemaining, subjectTimeLogId, mutate, status])


  useEffect(() => {

    if (timeRemaining <= 0) return
    timer.current = setInterval(() => {
      const now = new Date()
      const diff = endTime.getTime() - now.getTime()
      setTimeRemaining(Math.ceil(diff / 1000))
    }, 1000)

    return () => {
      clearInterval(timer.current)
    }
  }, [timeRemaining])

  if (timeRemaining <= 0) {
    return <p className="text-green-500 text-sm">Session Ended</p>
  }



  return <div className="text-center">
    <p className="text-5xl font-bold">
      {formatTime(timeRemaining)}
    </p>
    <p className="text-sm text-muted-foreground">{Math.floor(timeRemaining / 60)} minutes left</p>
  </div>
}
