"use client"
import { Pause, Play, RocketIcon, RotateCcw, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { MouseEvent, useEffect, useState } from "react";
import useStudentStore, { Student } from "@/store/student";
import { cn, formatTime, formatTimeRange, formatTimestamp } from "@/lib/utils";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"


type Props = {
  student: Student
}

export default function TimerCard({ student }: Props) {
  const [isToggle, setIsToggle] = useState(false);
  const { updateStudent, deleteStudent, handleStart, handlePause, handleReset } = useStudentStore()

  useEffect(() => {
    const interval = setInterval(() => {
      if (student.isActive && student.timeLeft > 0) {
        updateStudent({ ...student, timeLeft: student.timeLeft - 1 })
      } else if (student.isActive && student.timeLeft === 0) {
        const endTime = new Date()
        updateStudent({ ...student, isActive: false, endTime, isCompleted: true })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [student.timeLeft, student.isActive])


  const onRemoveStudent = (id: number) => {
    deleteStudent(id)
  }

  const handleStartTimer = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    handleStart(student.id)
  }


  const handlePauseTimer = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    handlePause(student.id)
  }

  const handleResetTimer = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    handleReset(student.id)
  }


  return isToggle ? (
    <Card className="transition-all duration-300" onClick={() => setIsToggle(false)}>
      <CardHeader className="flex-row justify-between items-center w-full gap-4">
        <div>
          <p className="cursor-pointer font-bold">
            {student.name}
          </p>
          <p className="text-muted-foreground text-sm">{student.subject}</p>
        </div>
        {
          student.isCompleted ? (

            <Alert variant="success" className="w-full">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Horay!</AlertTitle>
              <AlertDescription>
                <span className="capitalize">{student.name}</span> has learned for {formatTimestamp(student.duration)}
              </AlertDescription>
            </Alert>
          ) : (
            <div className="text-center">
              <p className="text-3xl font-bold text-center">{formatTime(student.timeLeft)}</p>

              <p className="text-xs text-muted-foreground">{formatTimeRange(student.startTime, student.endTime)}</p>
            </div>
          )
        }
        {
          !student.isCompleted && (!student.isActive ?
            <Button disabled={student.isActive || student.isCompleted} onClick={handleStartTimer} size="icon" > <Play className="w-4 h-4" /></Button> :
            <Button disabled={!student.isActive} onClick={handlePauseTimer} size="icon" variant="outline">
              <Pause className="h-4 w-4" /></Button>)

        }
      </CardHeader>
    </Card>
  ) : (
    <Card className=" duration-300 transition-all" onClick={() => setIsToggle(true)}>
      <CardHeader className="flex-row justify-between w-full">
        <div className="cursor-pointer">
          <h3 className="text-lg font-bold capitalize">{student.name}</h3>
          <p className="text-muted-foreground text-sm">Subject: {student.subject}</p>
        </div>
        <Button onClick={() => onRemoveStudent(student.id)} variant="outline" size="icon"><X /></Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {
          student.isCompleted ? (

            <Alert variant="success">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Horay!</AlertTitle>
              <AlertDescription>
                <span className="capitalize">{student.name}</span> has learned for {formatTimestamp(student.duration)}
              </AlertDescription>
            </Alert>
          )
            :
            (
              <div className="flex flex-col gap-4 md:flex-row justify-between">
                <p className="text-5xl font-bold text-center">{formatTime(student.timeLeft)}</p>
                <div className="flex justify-between gap-2">
                  <Button disabled={student.isActive || student.isCompleted} onClick={handleStartTimer} className="w-full"> <Play className="w-4 h-4 mr-2" />Start</Button>
                  <Button disabled={!student.isActive} onClick={handlePauseTimer} className="w-full" variant="outline">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause</Button>
                  <Button disabled={student.isCompleted} onClick={handleResetTimer} className="w-full" variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset</Button>
                </div>
              </div>
            )
        }
        <div className="text-muted-foreground text-sm">
          <p>Time Range: {formatTimeRange(student.startTime, student.endTime)}</p>
          <p>Status:
            {student.isCompleted
              ? "Completed"
              : student.isActive
                ? "In progress"
                : student.startTime
                  ? "Paused"
                  : "Not started"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
