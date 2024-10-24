"use client"

import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button'
import { useEffect, useMemo, useState } from 'react'
import { useDrawerStore } from '@/store/drawer'
import { useGetSubject } from '@/features/subjects/api/use-get-subject'
import { useCreateSession } from '@/features/session/api/use-create-session'
import SelectCreateable from './select-createable'
import { useGetStudents } from '@/features/students/api/use-get-students'
import { useCreateStudent } from '@/features/students/api/use-create-students'
import { useCreateSubject } from '@/features/subjects/api/use-create-subject'



export default function TimerForm() {
  const createSession = useCreateSession()

  const createStudent = useCreateStudent()
  const createSubject = useCreateSubject()

  const { data: students } = useGetStudents()
  const { setIsOpen } = useDrawerStore()
  const { data: subjects } = useGetSubject()
  const [form, setForm] = useState({
    studentName: '',
    subject: '',
    studyDuration: '',
  });


  const onSubmit = () => {
    const duration = parseInt(form.studyDuration) * 60
    createSession.mutate({
      duration,
      studentId: parseInt(form.studentName),
      subjectId: parseInt(form.subject),
      teacherId: 1,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + duration * 1000),
      location: 'Tommo',
    })

  }

  useEffect(() => {
    if (createSession.isSuccess) {
      setForm({
        studentName: '',
        subject: '',
        studyDuration: '',
      });
      setIsOpen(false)
    }
  }, [createSession.isSuccess])



  return (
    <div className='w-full space-y-4'>
      <div className='flex gap-4'>

        <div className='w-full'>
          <Label htmlFor='studentName'>Student Name</Label>
          {
            students &&
            <SelectCreateable
              onCreate={(e) => {
                createStudent.mutate({
                  fullname: e,
                  nickname: e,
                })
              }}
              dissabled={createStudent.isPending}
              options={students.map(s => ({ label: s.nickname, value: s.id.toString() }))}
              onChange={(e) => { setForm({ ...form, studentName: e! }) }} />
          }
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='w-full'>
          <Label htmlFor='subject'>Subject</Label>
          {
            subjects &&
            <SelectCreateable
              onChange={e => setForm({ ...form, subject: e! })}
              onCreate={(e) => { createSubject.mutate({ name: e }) }}
              dissabled={createSubject.isPending}
              options={subjects.map(s => ({ label: s.name, value: s.id.toString() }))} />
          }
        </div>
        <div className='w-full'>
          <Label htmlFor='studyDuration'>Study Duration</Label>
          <Select value={form.studyDuration} onValueChange={(e) => setForm({ ...form, studyDuration: e })}>
            <SelectTrigger id='studyDuration'>
              <SelectValue placeholder='Select Duration' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1'>1 minutes</SelectItem>
              <SelectItem value='40'>40 minutes</SelectItem>
              <SelectItem value='60'>1 hour</SelectItem>
              <SelectItem value='120'>2 hours</SelectItem>
              <SelectItem value='180'>3 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button disabled={!form.studentName || !form.subject || !form.studyDuration || createSession.isPending} onClick={onSubmit} className='w-full'>Add Student </Button>
    </div>
  )
}
