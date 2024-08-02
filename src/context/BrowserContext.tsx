import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Topic } from './TopicsContext'

export interface Browser {
  timestamp: string
  partitions: number
  key: string
  value: string
  offset: number
}

interface InterfaceBrowser {
  browsers: Browser[]
  browserTopics: Topic[]
  produceMessage: (topicName: string, key: string, value: string, headers: { key: string; value: string }) => void
  searchByPartitions: (topicName: string, partition: number) => void
  searchByKeys: (searchRequest: string[], topicName: string, checked: boolean) => void
  searchByHeaders: (searchRequest: string[], topicName: string, checked: boolean) => void
  searchByDatetime: (topicName: string, time1: any, time2: any) => void
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
  produceMessage: (topicName: string, key: string, value: string, headers: { key: string; value: string }) => null,
  searchByPartitions: (topicName: string, partition: number) => null,
  searchByKeys: (searchRequest: string[], topicName: string, checked: boolean) => null,
  searchByHeaders: (searchRequest: string[], topicName: string, checked: boolean) => null,
  searchByDatetime: (topicName: string, time1: any, time2: any) => null,
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
      const response = await fetch(`http://localhost:5000/api/KafkaAdmin/get-topics?hideInternal=true`, {
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

  const produceMessage = async (
    topicName: string,
    key: string,
    value: string,
    headers: { key: string; value: string }
  ) => {
    try {
      const response = await fetch(`http://localhost:5000/api/KafkaAdmin/produce-message`, {
        method: 'POST',
        body: JSON.stringify({
          headers: [headers],
          key: key,
          value: value,
          topic: topicName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const handlePagination = async (pagination: { page: number; pageSize: number }, topicName: string) => {
    console.log('----', topicName, pagination.pageSize, pagination.page)

    try {
      const response = await fetch(
        `http://localhost:5000/api/KafkaAdmin/get-specific-pages?topic=${topicName}&pageSize=${pagination.pageSize}&pageNumber=${pagination.page}
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
        `http://localhost:5000/api/KafkaAdmin/search-by-partitions?topic=${topicName}&partition=${partition}`,
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

  const searchByKeys = async (searchRequest: string[], topicName: string, checked: boolean) => {
    try {
      setSearchLoad(true)
      let searchOption = 0
      if (checked) {
        searchOption = 1
      } else {
        searchOption = 2
      }
      const response = await fetch(`http://localhost:5000/api/KafkaAdmin/search-by-keys`, {
        method: 'POST',
        body: JSON.stringify({
          listOfKeys: searchRequest,
          topic: topicName,
          searchOption: searchOption
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      setBrowsers(data)
      setSearchLoad(false)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const searchByHeaders = async (searchRequest: string[], topicName: string, checked: boolean) => {
    try {
      setSearchLoad(true)
      let searchOption = 0
      if (checked) {
        searchOption = 1
      } else {
        searchOption = 2
      }
      const response = await fetch(`http://localhost:5000/api/KafkaAdmin/search-by-headers`, {
        method: 'POST',
        body: JSON.stringify({
          listOfKeys: searchRequest,
          topic: topicName,
          searchOption: searchOption
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      setBrowsers(data)
      setSearchLoad(false)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const searchByDatetime = async (topicName: string, time1: any, time2: any) => {
    try {
      setSearchLoad(true)
      const response = await fetch(
        `http://localhost:5000/api/KafkaAdmin/search-by-timestamps?time1=${time1}&time2=${time2}&topic=${topicName}`,
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
        `http://localhost:5000/api/KafkaAdmin/consume-messages-from-beginning?topicName=${topicName}`,
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
        produceMessage,
        searchByPartitions,
        searchByKeys,
        searchByHeaders,
        searchByDatetime,
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
