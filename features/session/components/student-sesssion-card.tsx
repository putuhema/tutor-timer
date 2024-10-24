import { Button } from "@/components/ui/button";
import { formatTimeRange, subjectColors } from "@/lib/utils";
import { X } from "lucide-react";
import TimeRemaining from "./time-remaining";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"
import { useDeleteSessionStudent } from "../api/use-delete-session-student";
import Avatar from "@/components/avatar";

type Props = {
  studentSession: {
    sessionId: number | null;
    date: string | null;
    studentSessionId: number | null;
    studentId: number | null;
    studentName: string | null;
    studentAvatar: string | null;
    subjectId: number;
    subjectName: string;
    startTime: string | null;
    endTime: string | null;
    duration: number | null;
    status: string | null;
    subjectTimeLogsId: number | null;
  }
}


const happytext = ['Horay!', 'Good Job!', 'Awesome!', 'Great Work!', 'おめでとう!', 'よくできました!']

export default function StudentSessionCard({ studentSession }: Props) {
  const { mutate } = useDeleteSessionStudent()

  const onDelete = () => {
    if (studentSession.subjectTimeLogsId) {
      mutate({
        id: studentSession.subjectTimeLogsId.toString(),
      })
    }
  }


  return (
    <div className="flex gap-2 w-full justify-between">
      <div className={cn('border rounded-full w-16 h-16 flex justify-center items-center', subjectColors(studentSession.subjectName))}>
        <Avatar currentAvatar={studentSession.studentAvatar || ""} />
      </div>
      <div className={cn('flex-1 border p-2 rounded-lg shadow-[0_5px_0_0] shadow-blue-500 flex gap-2 justify-between',
        subjectColors(studentSession.subjectName), "bg-white",
        studentSession.status === "COMPLETED" && "border-gray-400 shadow-gray-200 text-muted-foreground",
      )}>
        <div className="flex w-full flex-col justify-center items-start">
          <div className="flex flex-col  gap-2 items-start">
            <div className="flex gap-2 items-center">
              <p className={cn('capitalize font-bold')} >{studentSession.studentName}</p>
              <Badge variant="outline"
                className={cn('border border-blue-500 text-blue-500', studentSession.status === "COMPLETED" && "border-green-500 text-green-500", subjectColors(studentSession.subjectName))}>
                {studentSession.subjectName}
              </Badge>

            </div>
            <p className="text-sm text-center text-muted-foreground">
              {formatTimeRange(new Date(studentSession.startTime || new Date()), new Date(studentSession.endTime || new Date()))}
            </p>
          </div>
          <TimeRemaining
            status={studentSession.status || ""}
            subjectTimeLogId={studentSession.subjectTimeLogsId || 0}
            endTime={new Date(studentSession.endTime || new Date())}
            endMsg={`${happytext[Math.floor(Math.random() * happytext.length)]} ${studentSession.studentName} has learned ${studentSession.subjectName}. For ${Math.ceil(studentSession.duration! / 60)} hours.`}
          />
        </div>
        <Button onClick={onDelete} variant="outline" size="icon"><X className="w-4 h-4" /></Button>
      </div>
    </div>
  )
}
