
import EditStudentForm from "@/features/students/components/edit-student-form"
import StudentForm from "@/features/students/components/student-form"
import StudentTable from "@/features/students/components/student-table"

export default function Page() {

  return (
    <div className="w-full p-6">
      <StudentForm />
      <EditStudentForm />
      <StudentTable />
    </div>
  )
}
