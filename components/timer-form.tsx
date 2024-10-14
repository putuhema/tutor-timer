"use client"

import { Label } from './ui/label'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button'
import { useState } from 'react'
import useStudentStore from '@/store/student'
import { useDrawerStore } from '@/store/drawer'


const subjects = [
  'Prisma',
  'Cermat',
  'Mathe',
  'English',
  'Calistung',
  'Komputer',
  'Pra Baca Tulis'
]

export default function TimerForm() {
  const { addStudent } = useStudentStore()
  const { setIsOpen } = useDrawerStore()
  const [form, setForm] = useState({
    studentName: '',
    subject: '',
    studyDuration: '',
  });

  const onSubmit = () => {
    const time = parseInt(form.studyDuration) * 60
    addStudent({
      name: form.studentName,
      subject: form.subject,
      duration: time,
      timeLeft: time,
      id: Date.now(),
      isActive: false,
      startTime: null,
      endTime: null,
      isCompleted: false
    })
    setForm({
      studentName: '',
      subject: '',
      studyDuration: '',
    });
    setIsOpen(false)
  }


  return (
    <div className='w-full p-4 space-y-4'>
      <div>
        <Label htmlFor='studentName'>Student Name</Label>
        <Input onChange={(e) => setForm({ ...form, studentName: e.target.value })} value={form.studentName} id='studentName' placeholder='Enter Student name' type='text' className='w-full' />
      </div>
      <div className='flex gap-4'>
        <div className='w-full'>
          <Label htmlFor='subject'>Subject</Label>
          <Select value={form.subject} onValueChange={(e) => setForm({ ...form, subject: e })} >
            <SelectTrigger id='subject'>
              <SelectValue placeholder='Select subject' />
            </SelectTrigger>
            <SelectContent>
              {
                subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
        <div className='w-full'>
          <Label htmlFor='studyDuration'>Study Duration</Label>
          <Select value={form.studyDuration} onValueChange={(e) => setForm({ ...form, studyDuration: e })}>
            <SelectTrigger id='studyDuration'>
              <SelectValue placeholder='Select Duration' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='5'>5 seconds</SelectItem>
              <SelectItem value='40'>40 minutes</SelectItem>
              <SelectItem value='60'>1 hour</SelectItem>
              <SelectItem value='120'>2 hours</SelectItem>
              <SelectItem value='180'>3 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button disabled={!form.studentName || !form.subject || !form.studyDuration} onClick={onSubmit} className='w-full'>Add Student </Button>
    </div>
  )
}
