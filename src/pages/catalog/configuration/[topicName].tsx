import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import TopicConfig from 'src/views/pages/catalog/configuration/TopicConfig'
import TopicConfigComp from 'src/views/pages/catalog/configuration/TopicConfigComp'

export default function index() {
  const [topicNameConfig, setTopicNameConfig] = useState('')
  const router = useRouter()
  useEffect(() => {
    if (!router.isReady) return

    setTopicNameConfig(router.query.topicName as string)
  }, [router.isReady])
  return (
    <div>
      <TopicConfigComp topicName={topicNameConfig} />
    </div>
  )
}
