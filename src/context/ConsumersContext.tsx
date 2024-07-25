import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface Consumer {
  group: string
  state: string
  overallLag: number
  coordinator: string
  id?: number
}

interface InterfaceConsumer {
  consumers: Consumer[]
  getConsumers: () => void
}

interface Props {
  children?: ReactNode
}

const InitialValue = {
  consumers: [],
  getConsumers: () => null
}

const ConsumerContext = createContext<InterfaceConsumer>(InitialValue)

const ConsumerProvider = ({ children }: Props) => {
  const [consumers, setConsumers] = useState<Consumer[]>([])

  const getConsumers = async () => {
    try {
      //   setIsLoading(true)
      const response = await fetch('http://localhost:5144/api/KafkaAdmin/get-consumer-groups', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      setConsumers(data)
      //   setIsLoading(false)
      return data
    } catch (err: any) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getConsumers()
  }, [])

  return <ConsumerContext.Provider value={{ consumers, getConsumers }}>{children}</ConsumerContext.Provider>
}

function useConsumer() {
  const context = useContext(ConsumerContext)
  if (context === undefined) throw new Error('ConsumerContext was used outside of the ConsumerProvider')
  return context
}

export { useConsumer, ConsumerProvider }
