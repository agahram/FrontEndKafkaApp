import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { setTimeout } from 'timers'

interface Connection {
  connectionName: string
  bootStrapServer: string
  connectionId?: number
}
interface Props {
  children?: ReactNode
}
interface InterfaceConnection {
  connections: Connection[] | null
  addConnections: (connection: Connection) => void
  deleteConnection: (id: number) => void
  editConnection: (connection: Connection) => void
  checkConnection: (bootStrapServer: string) => void
  testConnection: boolean
}

const InitialValue = {
  connections: [],
  addConnections: (connection: Connection) => null,
  deleteConnection: (id: number) => null,
  editConnection: (connection: Connection) => null,
  checkConnection: (bootStrapServer: string) => null,
  testConnection: false
}

const ConnectionContext = createContext<InterfaceConnection>(InitialValue)

const ConnectionProvider = ({ children }: Props) => {
  const [connections, setConnections] = useState<Connection[]>([])
  const [testConnection, setTestConnection] = useState(false)

  const addConnections = async (connection: Connection) => {
    // async function fetchConnections() {
    try {
      const response = await fetch('http://localhost:5144/api/KafkaCluster/create-connection', {
        method: 'POST',
        body: JSON.stringify(connection),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('RES', response)

          return response.json()
        })
        .then(data => console.log('DATA', data))

      // if (!response.ok) throw new Error('Something went wrong with the fetching connections')
      // return response
    } catch (err: any) {
      console.log(err.message)
    }
    setTimeout(async () => {
      let data = await getConnections()
      setConnections(data)
    }, 100)
  }

  const getConnections = async () => {
    try {
      const response = await fetch('http://localhost:5144/api/KafkaCluster/get-connections', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      setConnections(data)
      return data
    } catch (err: any) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getConnections()
  }, [])

  const deleteConnection = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5144/api/KafkaCluster/delete-connection?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
    } catch (err: any) {
      console.log(err.message)
    }
    setConnections(await getConnections())
  }
  const checkConnection = async (bootStrapServer: string) => {
    console.log(bootStrapServer)

    const response = await fetch(`http://localhost:5144/api/KafkaCluster/check-connection?address=${bootStrapServer}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let data = response
    // console.log(data)
    if (response.status === 200) {
      setTestConnection(true)
    } else {
      setTestConnection(false)
    }
  }
  const editConnection = (connection: Connection) => {}
  return (
    <ConnectionContext.Provider
      value={{ connections, deleteConnection, editConnection, addConnections, checkConnection, testConnection }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

function useConnection() {
  const context = useContext(ConnectionContext)
  if (context === undefined) throw new Error('ConnectionContext was used outside of the ConnectionProvider')
  return context
}

export { useConnection, ConnectionProvider }
