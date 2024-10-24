"use client"
import React, { useState } from 'react'
import { Session } from '../schema'
import { Badge } from '@/components/ui/badge'
import { cn, formatTimeRange, subjectColors } from '@/lib/utils'

type Props = {
  session: Session
}

export default function SessionHistoryItem({ session }: Props) {
  const [isDone, setDone] = useState(false)
  return (
    <button
      key={session.sessionId}
      onClick={() => setDone(!isDone)}
      className="flex w-full justify-between items-center gap-2 border-b border-dashed p-2"
    >
      <div className="flex items-center gap-2">
        <p className={cn(isDone ? "line-through text-muted-foreground" : "")}>{session.student.name}</p>
        <Badge variant="outline" className={cn(subjectColors(session.subject.name))}>{session.subject.name}</Badge>
      </div>
      <p className="text-sm">{formatTimeRange(new Date(session.startTime), new Date(session.endTime))}</p>
    </button>
  )
}
