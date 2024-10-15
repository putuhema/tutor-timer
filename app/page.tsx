"use client"

import FormContainer from "@/components/form-container";
import Nav from "@/components/nav";
import TimerCard from "@/components/timer-card";
import useStudentStore from "@/store/student";

export default function Home() {
  const { students } = useStudentStore();
  return (
    <>
      <Nav />
      <main className="p-8 pb-10 mt-20 lg:mt-0 w-full lg:max-w-lg lg:mx-auto">
        <div className="lg:mb-4">
          <FormContainer />
        </div>
        {
          students.length > 0 ?
            (
              <div className="flex flex-col gap-4">
                {
                  students.map(student => (
                    <TimerCard key={student.id} student={student} />
                  ))
                }
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-sm italic">No students yet.</p>
            )
        }
      </main>
    </>
  );
}
