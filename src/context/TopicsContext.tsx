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
interface Props {
  children?: ReactNode
}
interface InterfaceTopic {
  topics: Topic[] | any[]
  addTopic: (connection: Topic) => void
  deleteTopic: (name: string) => void
  getTopics: () => void
  cloneTopics: (oldName: string, newName: string) => void
  editTopics: (oldName: string, newName: string) => void
  rows: undefined | { [s: string]: any }
}

const InitialValue = {
  topics: [],
  addTopic: (connection: Topic) => null,
  deleteTopic: (name: string) => null,
  getTopics: () => null,
  cloneTopics: (oldName: string, newName: string) => null,
  editTopics: (oldName: string, newName: string) => null,
  rows: undefined
}

const TopicContext = createContext<InterfaceTopic>(InitialValue)

const TopicProvider = ({ children }: Props) => {
  const [topics, setTopics] = useState<Topic[]>([])
  const [rows, setRows] = useState()

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
      const response = await fetch('http://localhost:5144/api/KafkaAdmin/get-topics?hideInternal=true', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      setRows(data)
      // console.log('data', Object.values(data).find(item => item).replicationFactor)
      // setTopics([
      //   {
      //     name: data.name,
      //     replicationFactor: data.replicationFactor,
      //     partitions: 10,
      //     id: data.topicId.value
      //   }
      // ])
      setTopics(data)
      return data
    } catch (err: any) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getTopics()
  }, [])

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
  return (
    <TopicContext.Provider
      value={{
        topics,
        deleteTopic,
        addTopic,
        getTopics,
        cloneTopics,
        editTopics,
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
