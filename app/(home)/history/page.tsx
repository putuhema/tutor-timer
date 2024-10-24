"use client"

import { Badge } from "@/components/ui/badge"
import { useGetHistorySession } from "@/features/session/api/use-get-history-session"
import SessionHistoryItem from "@/features/session/components/session-history-item"
import { cn, formatTimeRange, subjectColors } from "@/lib/utils"
import { format } from "date-fns"
import { ChevronDown, Loader2 } from "lucide-react"
import { useState } from "react"

export default function Page() {
  const { data: sessions, isLoading } = useGetHistorySession(1)
  const [open, setOpen] = useState(false)

  if (isLoading) {
    return <div className="w-full flex justify-center">
      <Loader2 className="animate-spin text-muted-foreground w-4 h-4 text-center" />
    </div>
  }



  return (
    <div>
      {
        sessions && sessions.map((session, idx) => (
          <div key={`item-${idx + 1}`}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between w-full">
              <p className="font-bold text-sm">{format(new Date(session.date), "PPPP")}</p>
              <ChevronDown className={cn("transform transition-all duration-200 w-4 h-4 text-muted-foreground", open && "rotate-180")} />
            </button>
            {
              open && (
                <>
                  <div className="p-2 flex flex-col gap-2 border-b pb-10">
                    {
                      session.sessions.map(s => (
                        <SessionHistoryItem key={s.sessionId} session={s} />
                      ))
                    }
                  </div>
                </>
              )
            }
          </div>
        ))
      }
    </div>
  )

}
