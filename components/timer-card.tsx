"use client"
import { Pause, Play, RocketIcon, RotateCcw, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import useStudentStore, { Student } from "@/store/student";
import { cn, formatTime, formatTimeRange, formatTimestamp } from "@/lib/utils";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import Image from "next/image";
import { Orbitron } from "next/font/google";


const orbitron = Orbitron({ subsets: ["latin"], weight: "400" });


type Props = {
  student: Student
}
const workerCode = `
  let timers = {};
  let endTimes = {};

  self.onmessage = function(e) {
    const { type, id, timeLeft } = e.data;
    if (type === 'start') {
      clearInterval(timers[id]);
      endTimes[id] = Date.now() + (timeLeft * 1000);
      timers[id] = setInterval(() => {
        const remainingTime = Math.max(0, Math.ceil((endTimes[id] - Date.now()) / 1000));
        self.postMessage({ type: 'tick', id, timeLeft: remainingTime });
        if (remainingTime <= 0) {
          clearInterval(timers[id]);
          delete timers[id];
          delete endTimes[id];
          self.postMessage({ type: 'complete', id });
        }
      }, 1000);
    } else if (type === 'stop') {
      clearInterval(timers[id]);
      delete timers[id];
      delete endTimes[id];
    }
  };
`;

export default function TimerCard({ student }: Props) {

  const [isToggle, setIsToggle] = useState(true);
  const { updateStudent, deleteStudent, handleStart, handlePause, handleReset } = useStudentStore()
  const workerRef = useRef<Worker | null>(null)

  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      seed: student.avatar
    }).toDataUri()
  }, [student.avatar])

  const initializeWorker = useCallback(() => {
    if (!workerRef.current) {
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      workerRef.current = new Worker(URL.createObjectURL(blob));

      workerRef.current.onmessage = (e) => {
        const { type, id, timeLeft } = e.data;
        if (type === 'tick') {
          updateStudent(id, { timeLeft });
          localStorage.setItem(`student_${id}_timeLeft`, timeLeft.toString());
        } else if (type === 'complete') {
          updateStudent(id, { isActive: false, timeLeft: 0, isCompleted: true, endTime: new Date() });
        }
      };
    }
  }, [updateStudent]);

  useEffect(() => {
    initializeWorker();

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [initializeWorker]);

  useEffect(() => {
    if (workerRef.current) {
      if (student.isActive && student.timeLeft > 0) {
        workerRef.current.postMessage({ type: 'start', id: student.id, timeLeft: student.timeLeft });
      } else {
        workerRef.current.postMessage({ type: 'stop', id: student.id });
      }
    }
  }, [student.id, student.isActive, student.timeLeft]);

  useEffect(() => {
    const savedTimeLeft = localStorage.getItem(`student_${student.id}_timeLeft`);
    if (savedTimeLeft) {
      updateStudent(student.id, { timeLeft: parseInt(savedTimeLeft, 10) });
    }
  }, [student.id, updateStudent]);

  const onRemoveStudent = (id: number) => {
    deleteStudent(id)
    localStorage.removeItem(`student_${id}_timeLeft`);
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
    localStorage.setItem(`student_${student.id}_timeLeft`, student.timeLeft.toString());
  }

  return isToggle ? (
    <Card className="relative transition-all duration-300 shadow-[0px_5px_0px_0px] z-50 bg-white border border-blue-500 shadow-blue-500" onClick={() => setIsToggle(!isToggle)}>
      <CardHeader className="flex-row justify-between items-center w-full gap-4 p-2 px-4">
        <div className="text-center">
          <div className="bg-white border border-blue-500 rounded-full w-14 h-14  shadow-[inset_0_3px_0px] shadow-blue-500">
            <Image src={avatar} alt={student.name} width={80} height={80} className="rounded-full" />
          </div>
          <p className="font-bold capitalize">
            {student.name}
          </p>
        </div>
        {
          student.isCompleted ? (

            <Alert variant="success" className="w-full">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Yippie 😆😆😆</AlertTitle>
              <AlertDescription>
                <span className="capitalize">{student.name}</span> has learned {student.subject} for {formatTimestamp(student.duration)}
              </AlertDescription>
            </Alert>
          ) : (
            <div className="text-center">
              <p className={cn("text-3xl  text-center", orbitron.className)}>{formatTime(student.timeLeft)}</p>

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
    <Card className="relative transition-all duration-300 shadow-[0px_5px_0px_0px] bg-white border border-blue-500 shadow-blue-500" onClick={() => setIsToggle(!isToggle)}>
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
            <Alert variant="success" className="w-full">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Yippie 😆😆😆</AlertTitle>
              <AlertDescription>
                <span className="capitalize">{student.name}</span> has learned {student.subject} for {formatTimestamp(student.duration)}
              </AlertDescription>
            </Alert>
          )
            :
            (
              <div className="flex flex-col gap-4 justify-between">
                <p className={cn("text-5xl font-bold text-center", orbitron.className)}>{formatTime(student.timeLeft)}</p>
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
