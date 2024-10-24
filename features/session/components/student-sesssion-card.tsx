import { Button } from "@/components/ui/button";
import { formatTimeRange } from "@/lib/utils";
import { PenLine, X } from "lucide-react";
import TimeRemaining from "./time-remaining";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"
import { useDeleteSessionStudent } from "../api/use-delete-session-student";

type Props = {
  studentSession: {
    sessionId: number | null;
    date: string | null;
    studentSessionId: number | null;
    studentId: number | null;
    studentName: string | null;
    subjectId: number;
    subjectName: string;
    startTime: string | null;
    endTime: string | null;
    duration: number | null;
    status: string | null;
    subjectTimeLogsId: number | null;
  }
}


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
    <div className="border p-2 rounded-lg shadow-[0_5px_0_0] shadow-blue-400 flex gap-2 justify-between">
      <div>
        <p>{studentSession.studentName}</p>
        <Badge variant="outline" className={cn("text-purple-500")}>{studentSession.subjectName}</Badge>
      </div>
      <div>
        <p className="text-sm">
          {formatTimeRange(new Date(studentSession.startTime || new Date()), new Date(studentSession.endTime || new Date()))}</p>
        <TimeRemaining status={studentSession.status || ""} subjectTimeLogId={studentSession.subjectTimeLogsId || 0} endTime={new Date(studentSession.endTime || new Date())} />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon"><PenLine className="w-4 h-4" /></Button>
        <Button onClick={onDelete} variant="outline" size="icon"><X className="w-4 h-4" /></Button>
      </div>
    </div>
  )
}
