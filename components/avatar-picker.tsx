import { createAvatar } from "@dicebear/core"
import { lorelei } from "@dicebear/collection"
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Dices } from 'lucide-react'
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";

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

type Props = {
  value?: string | undefined;
  onChange: (value: string) => void;
}

export default function AvatarPicker({ value, onChange }: Props) {

  const [currentAvatar, setCurrentAvatar] = useState(0)
  useEffect(() => {
    if (value) {
      setCurrentAvatar(collection.indexOf(value))
      return
    }
    setCurrentAvatar(Math.floor(Math.random() * collection.length))
  }, [value])

  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      seed: collection[currentAvatar]
    }).toDataUri()
  }, [currentAvatar, collection, value])


  useEffect(() => {
    onChange(collection[currentAvatar])
  }, [currentAvatar])


  const pickAvatar = (dir: number) => {
    if (dir === 1) {
      if (currentAvatar < collection.length - 1) {
        setCurrentAvatar(currentAvatar + 1)
      } else if (currentAvatar === collection.length - 1) {
        setCurrentAvatar(0)
      }
    } else if (dir === -1) {
      if (currentAvatar > 0) {
        setCurrentAvatar(currentAvatar - 1)
      } else if (currentAvatar === 0) {
        setCurrentAvatar(collection.length - 1)
      }
    }
  }

  const randomizeAvatar = () => {
    setCurrentAvatar(Math.floor(Math.random() * collection.length))
  }

  return (
    <div className='w-full flex flex-col items-center justify-center space-y-3'>
      <div className='w-24 h-24'>
        <Image className='border-2 select-none w-full h-full rounded-full object-cover' src={avatar} alt='Avatar' width={100} height={100} />
      </div>
      <div className='flex gap-4 items-center'>
        <Button type="button" size="icon" variant="outline" onClick={() => pickAvatar(-1)}>
          <ChevronLeft />
        </Button>
        <Button type="button" size="icon" variant="outline" onClick={randomizeAvatar}><Dices /></Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={() => pickAvatar(1)}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
