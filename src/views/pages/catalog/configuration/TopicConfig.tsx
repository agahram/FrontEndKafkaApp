import { collapseClasses } from '@mui/material'
import { color } from '@mui/system'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTopic } from 'src/context/TopicsContext'

interface Props {
  name: string
}

export default function TopicConfig({ name }: Props) {
  //   function handleTopicDetails() {
  //     router.push('/catalog/configuration')
  //     getTopicConfig(name)
  //   }

  return (
    <a href={`/catalog/configuration/${name}`} style={{ color: '#5C61E6', fontWeight: 500 }}>
      {name}
    </a>
  )
}
