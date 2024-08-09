import { useRouter } from 'next/router'
import React from 'react'
import BrowserComp from 'src/views/pages/browser/BrowserComp'

export default function index() {
  const router = useRouter()

  return (
    <div>
      <BrowserComp topicName={router.query.name} />
    </div>
  )
}
