import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Topic } from './TopicsContext'

export interface Browser {
  timestamp: string
  partition: number
  key: number
  value: number
  offset: number
}

interface InterfaceBrowser {
  browsers: Browser[]
  browserTopics: Topic[]
  consumeMessages: (topicName: string) => void
  getBrowserTopics: () => void
  isLoading: boolean
  loading: boolean
}

interface Props {
  children?: ReactNode
}

const InitialValue = {
  browsers: [],
  browserTopics: [],
  consumeMessages: (topicName: string) => null,
  getBrowserTopics: () => null,
  isLoading: false,
  loading: false
}

const BrowserContext = createContext<InterfaceBrowser>(InitialValue)

const BrowserProvider = ({ children }: Props) => {
  const [browsers, setBrowsers] = useState<Browser[]>([])
  const [browserTopics, setBrowserTopics] = useState<Topic[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const getBrowserTopics = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:5144/api/KafkaAdmin/get-topics?hideInternal=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      setBrowserTopics(data)
      setIsLoading(false)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const consumeMessages = async (topicName: string) => {
    try {
      setLoading(true)
      const response = await fetch(
        `http://localhost:5144/api/KafkaAdmin/consume-messages-from-beginning?topicName=${topicName}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      let data = await response.json()
      setBrowsers(data)
      setLoading(false)
      return data
    } catch (err: any) {
      console.log(err.message)
    }
  }

  return (
    <BrowserContext.Provider value={{ browsers, browserTopics, consumeMessages, getBrowserTopics, isLoading, loading }}>
      {children}
    </BrowserContext.Provider>
  )
}

function useBrowser() {
  const context = useContext(BrowserContext)
  if (context === undefined) throw new Error('BrowserContext was used outside of the BrowserProvider')
  return context
}

export { useBrowser, BrowserProvider }
