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

  return <a href={`/catalog/configuration/${name}`}>{name}</a>
}
