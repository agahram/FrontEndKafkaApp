import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

export interface Consumer {
  group: string
  state: string
  overallLag: number
  consumHostId: string
  assignedTopics: string[]
  id?: number
}

interface InterfaceConsumer {
  consumers: Consumer[]
  getConsumers: () => void
  isLoading: boolean
}

interface Props {
  children?: ReactNode
}

const InitialValue = {
  consumers: [],
  getConsumers: () => null,
  isLoading: false
}

const ConsumerContext = createContext<InterfaceConsumer>(InitialValue)

const ConsumerProvider = ({ children }: Props) => {
  const [consumers, setConsumers] = useState<Consumer[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getConsumers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:5000/api/KafkaAdmin/get-consumer-groups', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      setConsumers(data)

      setIsLoading(false)
      return data
    } catch (err: any) {
      console.log(err.message)
    }
  }

  return <ConsumerContext.Provider value={{ consumers, getConsumers, isLoading }}>{children}</ConsumerContext.Provider>
}

function useConsumer() {
  const context = useContext(ConsumerContext)
  if (context === undefined) throw new Error('ConsumerContext was used outside of the ConsumerProvider')
  return context
}

export { useConsumer, ConsumerProvider }
