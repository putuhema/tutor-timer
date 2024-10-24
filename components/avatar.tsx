import React, { useMemo } from 'react'
import { createAvatar } from "@dicebear/core"
import { lorelei } from "@dicebear/collection"
import Image from 'next/image'

type Props = {
  currentAvatar: string
}

export default function Avatar({ currentAvatar }: Props) {

  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      seed: currentAvatar

    }).toDataUri()
  }, [currentAvatar])
  return (
    <Image
      src={avatar} width={80} height={80} alt='avatar' />
  )
}
