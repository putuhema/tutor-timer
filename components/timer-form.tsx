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
import { useMemo, useState } from 'react'
import useStudentStore from '@/store/student'
import { useDrawerStore } from '@/store/drawer'
import { createAvatar } from "@dicebear/core"
import { lorelei, loreleiNeutral } from "@dicebear/collection"
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Dices } from 'lucide-react'


const subjects = [
  "Abama",
  'Prisma',
  'Cermat',
  'Mathe',
  'English',
  'Calistung',
  'Komputer',
  'Pra Baca Tulis'
]

const collection = [
  'Katherine',
  "Mackenzie",
  "Amaya",
  "Jade",
  "Sophia",
  "Jude",
  "Leah",
  "Kimberly",
  "Sawyer",
  "Brian",
  "Avery",
  "Eliza",
  "Sara",
  "Eden",
  "Nolan",
  "Alexander",
  "Liam",
  "Valentina",
  "Sarah",
  "Riley"
]

export default function TimerForm() {
  const { addStudent } = useStudentStore()
  const { setIsOpen } = useDrawerStore()
  const [currentAvatar, setCurrentAvatar] = useState(0)
  const [form, setForm] = useState({
    studentName: '',
    subject: '',
    studyDuration: '',

  });

  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      seed: collection[currentAvatar]
    }).toDataUri()
  }, [currentAvatar, collection])

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
      elapsedTime: 0,
      isCompleted: false,
      avatar: collection[currentAvatar]
    })
    setForm({
      studentName: '',
      subject: '',
      studyDuration: '',
    });
    setIsOpen(false)
  }


  const pickAvatar = (dir: number) => {
    if (dir === 1 && currentAvatar < collection.length - 1) {
      setCurrentAvatar(currentAvatar + 1)
    } else if (dir === -1 && currentAvatar > 0) {
      setCurrentAvatar(currentAvatar - 1)
    }
  }

  const randomizeAvatar = () => {
    setCurrentAvatar(Math.floor(Math.random() * collection.length))
  }

  return (
    <div className='w-full space-y-4'>
      <div className='flex gap-4'>
        <div className='w-full flex flex-col items-center justify-center space-y-3'>
          <div className='w-24 h-24'>
            <Image className='border-2 select-none w-full h-full rounded-full object-cover' src={avatar} alt='Avatar' width={100} height={100} />
          </div>
          <div className='flex gap-4 items-center'>
            <Button disabled={currentAvatar === 0} size="icon" variant="outline" onClick={() => pickAvatar(-1)}>
              <ChevronLeft />
            </Button>
            <Button size="icon" variant="outline" onClick={randomizeAvatar}><Dices /></Button>
            <Button
              disabled={currentAvatar === collection.length - 1}
              size="icon" variant="outline"
              onClick={() => pickAvatar(1)}>
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className='w-full'>
          <Label htmlFor='studentName'>Student Name</Label>
          <Input onChange={(e) => setForm({ ...form, studentName: e.target.value })} value={form.studentName} id='studentName' placeholder='Enter Student name' type='text' className='w-full' />
        </div>
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
