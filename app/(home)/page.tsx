"use client"

import FormContainer from "@/components/form-container";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSession } from "@/features/session/api/use-get-session";
import StudentSessionCard from "@/features/session/components/student-sesssion-card";

export default function Home() {
  const { data, isLoading } = useGetSession(1)


  if (isLoading) {
    return <div className="flex flex-col gap-2">
      <Skeleton className="h-16 w-full " />
      <Skeleton className="h-16 w-full " />
      <Skeleton className="h-16 w-full " />
      <Skeleton className="h-16 w-full " />
    </div>
  }

  if (!data?.length) {
    return (<div>
      <div className="md:mb-4">
        <FormContainer />
      </div>
      <p className="text-center text-muted-foreground text-sm italic">No students yet.</p>
    </div>)
  }

  return (
    <>
      <main className=" w-full lg:max-w-lg lg:mx-auto">
        <div className="md:mb-4">
          <FormContainer />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {
            data.map(session => (
              <StudentSessionCard
                key={`session-${session.studentId}-${session.studentSessionId}-${session.subjectId}`}
                studentSession={session} />
            ))
          }
        </div>
      </main >
    </>
  );
}
