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
      <main className="p-8">
        <FormContainer />
        <div className="flex flex-col gap-4">
          {
            students.map(student => (
              <TimerCard key={student.id} student={student} />
            ))
          }
        </div>
      </main>
    </>
  );
}
