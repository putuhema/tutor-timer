
import StudentForm from "@/features/students/components/student-form"
import StudentTable from "@/features/students/components/student-table"

export default function Page() {

  return (
    <div className="w-full p-6">
      <StudentForm />
      <StudentTable />
    </div>
  )
}
