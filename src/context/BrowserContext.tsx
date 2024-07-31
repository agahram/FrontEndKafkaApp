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
  searchByPartitions: (topicName: string, partition: number) => void
  handlePagination: (pagination: { page: number; pageSize: number }, topicName: string) => void
  consumeMessages: (topicName: string) => void
  getBrowserTopics: () => void
  isLoading: boolean
  loading: boolean
  searchLoad: boolean
}

interface Props {
  children?: ReactNode
}

const InitialValue = {
  browsers: [],
  browserTopics: [],
  searchByPartitions: (topicName: string, partition: number) => null,
  handlePagination: (pagination: { page: number; pageSize: number }, topicName: string) => null,
  consumeMessages: (topicName: string) => null,
  getBrowserTopics: () => null,
  isLoading: false,
  loading: false,
  searchLoad: false
}

const BrowserContext = createContext<InterfaceBrowser>(InitialValue)

const BrowserProvider = ({ children }: Props) => {
  const [browsers, setBrowsers] = useState<Browser[]>([])
  const [browserTopics, setBrowserTopics] = useState<Topic[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchLoad, setSearchLoad] = useState(false)

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

  const produceMessage = async (topicName: string, key: string, value: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:5144/api/KafkaAdmin/produce-message?topic=${topicName}`, {
        method: 'POST',
        body: JSON.stringify({
          topicName: topicName,
          key: key,
          value: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      setIsLoading(false)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const handlePagination = async (pagination: { page: number; pageSize: number }, topicName: string) => {
    console.log('----', topicName, pagination.pageSize, pagination.page)

    try {
      const response = await fetch(
        `http://localhost:5144/api/KafkaAdmin/get-specific-pages?topic=${topicName}&pageSize=${pagination.pageSize}&pageNumber=${pagination.page}
      `,
        {
          method: 'GET'
        }
      )
      let data = await response.json()
      setBrowsers(data)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const searchByPartitions = async (topicName: string, partition: number) => {
    try {
      setSearchLoad(true)
      const response = await fetch(
        `http://localhost:5144/api/KafkaAdmin/search-by-partitions?topic=${topicName}&partition=${partition}`,
        {
          method: 'GET'
        }
      )
      let data = await response.json()
      setBrowsers(data)
      setSearchLoad(false)
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
    <BrowserContext.Provider
      value={{
        browsers,
        browserTopics,
        searchByPartitions,
        handlePagination,
        consumeMessages,
        getBrowserTopics,
        isLoading,
        loading,
        searchLoad
      }}
    >
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
