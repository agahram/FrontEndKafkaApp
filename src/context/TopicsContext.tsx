import { da } from 'date-fns/locale'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { setTimeout } from 'timers'
import { boolean, string } from 'yup'

interface Topic {
  name: string
  replicationFactor: number
  partitions: number
  id?: number
}

interface Partition {
  partitionNumber: string
  size: number
}

interface TopicConfig {
  id?: number
  recordsCount: number
  partitions: Partition[]
  topicSize: number
  replicationFactor: number
}
interface Props {
  children?: ReactNode
}
interface InterfaceTopic {
  topics: Topic[]
  topic: TopicConfig | undefined
  topicSize: undefined | { [s: string]: any } | ArrayLike<any>
  isLoading: boolean
  topicNameConfig: string | null
  getTopic: (topicName: string) => void
  setTopicNameConfig: (topicName: string) => void
  addTopic: (connection: Topic) => void
  deleteTopic: (name: string) => void
  getTopics: () => void
  cloneTopics: (oldName: string, newName: string) => void
  editTopics: (oldName: string, newName: string) => void
  getTopicConfig: (topicName: string) => void
  rows: undefined | { [s: string]: any }
}

const InitialValue = {
  topics: [],
  topic: undefined,
  topicSize: undefined,
  isLoading: false,
  topicNameConfig: null,
  getTopic: (topicName: string) => null,
  setTopicNameConfig: (topicName: string) => null,
  addTopic: (connection: Topic) => null,
  deleteTopic: (name: string) => null,
  getTopics: () => null,
  cloneTopics: (oldName: string, newName: string) => null,
  editTopics: (oldName: string, newName: string) => null,
  getTopicConfig: (topicName: string) => null,
  rows: undefined
}

const TopicContext = createContext<InterfaceTopic>(InitialValue)

const TopicProvider = ({ children }: Props) => {
  const [topics, setTopics] = useState<Topic[]>([])
  const [topic, setTopic] = useState<TopicConfig>({
    recordsCount: 0,
    partitions: [],
    topicSize: 0,
    replicationFactor: 0
  })
  const [rows, setRows] = useState()
  const [topicNameConfig, setTopicNameConfig] = useState('')
  const [topicSize, setTopicSize] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const addTopic = async (topic: Topic) => {
    // async function fetchConnections() {
    console.log('topic add', topic)
    try {
      const response = await fetch('http://localhost:5144/api/KafkaAdmin/create-topic', {
        method: 'POST',
        body: JSON.stringify(topic),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('RES', response)

          return response.json()
        })
        .then(data => console.log('DATA', data))
    } catch (err: any) {
      console.log(err.message)
    }
    setTimeout(async () => {
      let data = await getTopics()
    }, 100)
  }

  const getTopics = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:5144/api/KafkaAdmin/get-topics?hideInternal=false', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      setTopics(data)
      setIsLoading(false)
      return data
    } catch (err: any) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getTopics()
  }, [])

  const getTopic = async (topicName: string) => {
    console.log('topic name--', topicName)
    try {
      setTimeout(async () => {
        const response = await fetch(`http://localhost:5144/api/KafkaAdmin/get-topic?topicName=${topicName}`, {
          method: 'GET'
          // headers: {
          //   'Content-Type': 'application/json'
          // }
        })
        let data = await response.json()
        setTopic(data)
      }, 2000)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const deleteTopic = async (name: string) => {
    try {
      const response = await fetch(`http://localhost:5144/api/KafkaAdmin/delete-topic?topicName=${name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
    } catch (err: any) {
      console.log(err.message)
    }
    setTopics(await getTopics())
  }
  const cloneTopics = async (oldName: string, newName: string) => {
    // async function fetchConnections() {
    console.log(oldName, newName)
    try {
      const response = await fetch(
        `http://localhost:5144/api/KafkaAdmin/clone-topic?oldTopicName=${oldName}&newTopicName=${newName}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(response => {
          console.log('RES', response)

          return response.json()
        })
        .then(data => console.log('DATA', data))
    } catch (err: any) {
      console.log(err.message)
    }
    setTimeout(async () => {
      let data = await getTopics()
    }, 100)
  }
  const editTopics = async (oldName: string, newName: string) => {
    // async function fetchConnections() {
    console.log(oldName, newName)
    try {
      const response = await fetch(
        `http://localhost:5144/api/KafkaAdmin/rename-topic?oldTopicName=${oldName}&newTopicName=${newName}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(response => {
          console.log('RES', response)

          return response.json()
        })
        .then(data => console.log('DATA', data))
    } catch (err: any) {
      console.log(err.message)
    }
    setTimeout(async () => {
      let data = await getTopics()
    }, 100)
  }
  const getTopicConfig = async (topicName: string) => {
    console.log('topic name--', topicName)
    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:5144/api/KafkaAdmin/get-topic-config?topicName=${topicName}`, {
        method: 'GET'
        // headers: {
        //   'Content-Type': 'application/json'
        // }
      })
      let data = await response.json()
      setRows(data)
      setIsLoading(false)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  // const getTopicSize = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5144/api/KafkaAdmin/get-topic-size', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     let data = await response.json()
  //     setTopicSize(data)
  //     console.log('topicSize:', topicSize)
  //     return data
  //   } catch (err: any) {
  //     console.log(err.message)
  //   }
  // }
  // // getTopicSize()
  // useEffect(() => {
  //   getTopicSize()
  // }, [])
  return (
    <TopicContext.Provider
      value={{
        topics,
        topic,
        topicSize,
        isLoading,
        topicNameConfig,
        getTopic,
        setTopicNameConfig,
        deleteTopic,
        addTopic,
        getTopics,
        cloneTopics,
        editTopics,
        getTopicConfig,
        rows
      }}
    >
      {children}
    </TopicContext.Provider>
  )
}

function useTopic() {
  const context = useContext(TopicContext)
  if (context === undefined) throw new Error('ConnectionContext was used outside of the ConnectionProvider')
  return context
}

export { useTopic, TopicProvider }
