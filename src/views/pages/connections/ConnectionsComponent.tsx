// ** React Imports
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, use, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import MoreButton from './MoreButton'
import NewConnection from './NewConnectionButton'
import { useConnection } from 'src/context/ConnectionsContext'
import { margin } from '@mui/system'
import { left } from '@popperjs/core'
import toast from 'react-hot-toast'
import ViewCluster from './ViewCluster'
import { ThemeContext } from '@emotion/react'
import { Box } from '@mui/material'
import Icon from 'src/@core/components/icon'

interface Props {
  name: string
  details: string
  id: number
}

const DialogEditUserInfo = ({ name, details, id }: Props) => {
  // ** States
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const { connections, testConnection, checkConnection, setTestConnection } = useConnection()

  function handleClickDisconnect() {
    setIsConnected(false)
  }

  async function handleClickConnect() {
    setIsLoading(true)
    let data = await checkConnection(details)
    console.log('DATA', data)
    if (data?.ok) {
      setTestConnection(data?.status === 200)
      setIsConnected(true)
      setIsLoading(false)
    } else {
      toast('Cannot connect')
      setIsLoading(false)
    }
  }

  function Loader() {
    return (
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p>Loading...</p>
        <svg xmlns='http://www.w3.org/2000/svg' width='3em' height='4em' viewBox='0 0 24 24'>
          <path
            fill='none'
            stroke='currentColor'
            strokeDasharray={15}
            strokeDashoffset={15}
            strokeLinecap='round'
            strokeWidth={2}
            d='M12 3C16.9706 3 21 7.02944 21 12'
          >
            <animate fill='freeze' attributeName='stroke-dashoffset' dur='0.3s' values='15;0'></animate>
            <animateTransform
              attributeName='transform'
              dur='1.5s'
              repeatCount='indefinite'
              type='rotate'
              values='0 12 12;360 12 12'
            ></animateTransform>
          </path>
        </svg>
      </Stack>
    )
  }

  return (
    <>
      <Card>
        <CardContent sx={{ textAlign: 'center', '& svg': { mb: 2 }, marginTop: -5 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'end' }}>
              <Box sx={{ display: 'flex', paddingTop: 5 }}>
                <Icon icon='mdi:apache-kafka' fontSize={40} />
              </Box>
              <Box sx={{ mx: 2, paddingBottom: 2 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{name}</Typography>
                <Typography sx={{ fontSize: 10, fontWeight: 600 }}>KAFKA</Typography>
              </Box>
            </Box>
            <MoreButton id={id} name={name} details={details} />
          </Box>
          <Stack direction='row' sx={{ mb: 4 }}>
            <Stack spacing={0.1}>
              <Typography sx={{ mr: 3, fontWeight: 600, fontSize: 14 }}>Details</Typography>
              <Typography sx={{ mr: 3, fontSize: 14 }}>{details}</Typography>
            </Stack>
          </Stack>
          <br />
          <br />
          <br />
          <br />
          <br />
          {isLoading ? (
            <Loader />
          ) : testConnection && isConnected ? (
            <Stack spacing={1.5}>
              <ViewCluster name={name} />
              <Button
                variant='contained'
                sx={{ mr: 2, color: 'white' }}
                onClick={() => handleClickDisconnect()}
                fullWidth
              >
                Disconnect
              </Button>
            </Stack>
          ) : (
            <Button variant='outlined' sx={{ mr: 2, fontWeight: 401 }} onClick={() => handleClickConnect()} fullWidth>
              Connect
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default DialogEditUserInfo
