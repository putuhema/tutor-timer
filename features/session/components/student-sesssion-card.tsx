import { Button } from "@/components/ui/button";
import { formatTimeRange } from "@/lib/utils";
import { X } from "lucide-react";
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
    <div className={cn('border p-2 rounded-lg shadow-[0_5px_0_0] shadow-blue-500 flex gap-2 justify-between', studentSession.status === "COMPLETED" && "border-green-500 shadow-green-500 text-muted-foreground")}>
      <div>
        <p className={cn(studentSession.status === "COMPLETED" && "line-through")} >{studentSession.studentName}</p>
        <Badge variant="outline"
          className={cn('border border-blue-500 text-blue-500', studentSession.status === "COMPLETED" && "border-green-500 text-green-500")}>
          {studentSession.subjectName}
        </Badge>
      </div>
      <div>
        <p className="text-sm">
          {formatTimeRange(new Date(studentSession.startTime || new Date()), new Date(studentSession.endTime || new Date()))}
        </p>
        <TimeRemaining status={studentSession.status || ""} subjectTimeLogId={studentSession.subjectTimeLogsId || 0} endTime={new Date(studentSession.endTime || new Date())} />
      </div>
      <div className="flex gap-2">
        <Button onClick={onDelete} variant="outline" size="icon"><X className="w-4 h-4" /></Button>
      </div>
    </div>
  )
}
