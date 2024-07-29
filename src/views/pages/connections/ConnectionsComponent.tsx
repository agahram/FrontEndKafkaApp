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
          <Stack direction='row' spacing={3}>
            <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' height='5em' viewBox='0 0 256 413'>
              <path
                fill='#1a1919'
                d='M87.932 36.714c-4.55-4.571-10.896-7.394-17.951-7.394c-7.029 0-13.326 2.823-17.822 7.394h-.13c-4.535 4.55-7.358 10.9-7.358 17.93c0 7.055 2.823 13.352 7.359 17.875l.129.102c4.496 4.55 10.793 7.346 17.822 7.346c7.055 0 13.402-2.797 17.951-7.346L88 72.52c4.558-4.523 7.354-10.82 7.354-17.876c0-7.029-2.796-13.38-7.354-17.929zm-17.951 346.64a25.5 25.5 0 0 0 17.951-7.368l.067-.134c4.558-4.487 7.354-10.838 7.354-17.817c0-7.056-2.796-13.38-7.354-17.952h-.067c-4.55-4.625-10.896-7.42-17.951-7.42c-7.029 0-13.326 2.795-17.822 7.42h-.13c-4.535 4.572-7.358 10.896-7.358 17.952c0 6.98 2.823 13.33 7.359 17.817l.129.134a25.15 25.15 0 0 0 17.822 7.368m137.972-76.72c6.275-1.646 11.957-5.673 15.423-11.761l.468-.887c3.082-5.776 3.644-12.44 1.998-18.344c-1.659-6.324-5.735-11.917-11.81-15.418l-.352-.237c-5.918-3.242-12.662-3.947-18.857-2.274c-6.297 1.57-11.952 5.775-15.4 11.814c-3.492 5.981-4.223 12.88-2.55 19.231c1.725 6.244 5.761 11.89 11.796 15.418h.04c6.047 3.475 12.898 4.104 19.244 2.458M95.97 180.387c-6.654-6.637-15.824-10.794-25.988-10.794c-10.124 0-19.272 4.157-25.912 10.794c-6.61 6.614-10.686 15.76-10.686 25.898c0 10.165 4.076 19.339 10.686 26.029c6.64 6.582 15.788 10.712 25.912 10.712c10.164 0 19.334-4.13 25.988-10.712c6.623-6.69 10.7-15.864 10.7-26.029c0-10.137-4.077-19.284-10.7-25.898m-14.61-43.164c14.726 2.426 27.976 9.482 38.087 19.673h.08a72 72 0 0 1 4.625 5.147l25.284-14.629c-3.399-10.271-3.555-21.01-.826-31.072c3.609-13.487 12.35-25.56 25.453-33.137l.433-.26c12.96-7.345 27.696-8.861 41-5.253a54.52 54.52 0 0 1 33.186 25.48v.026c7.529 13.015 9.059 27.96 5.464 41.393c-3.581 13.478-12.363 25.631-25.453 33.155l-3.452 2.043h-.352c-12.109 5.771-25.426 6.663-37.655 3.447c-10.044-2.667-19.258-8.26-26.47-16.23l-25.243 14.585a69.7 69.7 0 0 1 4.509 24.694a70.7 70.7 0 0 1-4.51 24.824l25.244 14.53c7.212-8.072 16.426-13.562 26.47-16.229c13.469-3.684 28.405-2.114 41.46 5.49l.833.393v.053c12.613 7.627 21.078 19.441 24.619 32.767a54.43 54.43 0 0 1-5.464 41.344l-.454.914l-.054-.08c-7.564 12.573-19.48 21.091-32.638 24.695c-13.5 3.554-28.432 2.038-41.473-5.46v-.106c-13.103-7.578-21.844-19.678-25.453-33.133c-2.729-10.035-2.573-20.779.826-31.046l-25.284-14.584c-1.45 1.78-3.02 3.452-4.625 5.071l-.08.076c-10.11 10.142-23.361 17.198-38.088 19.548v29.217c10.494 2.194 19.9 7.448 27.273 14.816l.035.08c9.88 9.825 15.994 23.517 15.994 38.57c0 15.003-6.115 28.61-15.994 38.489l-.035.156c-9.946 9.879-23.598 15.993-38.65 15.993c-14.972 0-28.642-6.114-38.56-15.993h-.036v-.156c-9.893-9.879-16.02-23.486-16.02-38.49a54.26 54.26 0 0 1 16.02-38.569v-.08h.035c7.36-7.368 16.779-12.622 27.246-14.816v-29.217c-14.74-2.35-27.95-9.406-38.048-19.548l-.107-.076C7.89 243.053 0 225.624 0 206.285c0-19.284 7.89-36.714 20.511-49.389h.107c10.098-10.19 23.308-17.247 38.048-19.673v-29.087A55.34 55.34 0 0 1 31.42 93.293h-.035v-.08c-9.893-9.928-16.02-23.518-16.02-38.57c0-14.976 6.127-28.695 16.02-38.574l.035-.049C41.34 6.115 55.01 0 69.98 0c15.053 0 28.705 6.115 38.65 16.02v.05h.036c9.88 9.878 15.994 23.597 15.994 38.573c0 15.052-6.115 28.642-15.994 38.57l-.035.08c-7.373 7.319-16.779 12.568-27.273 14.843zm142.017-19.392l-.21-.312c-3.492-5.882-9.058-9.803-15.213-11.502c-6.346-1.672-13.197-.963-19.284 2.511h.04c-6.075 3.448-10.138 9.094-11.837 15.418a25.3 25.3 0 0 0 2.551 19.231l.116.16a25 25 0 0 0 15.284 11.57a24.83 24.83 0 0 0 19.21-2.48l.325-.156c5.905-3.528 9.838-9.094 11.484-15.208c1.673-6.298 1.008-13.197-2.466-19.232'
              ></path>
            </svg>
          </Stack>
          <Stack direction='row' sx={{ mb: 4, marginTop: -16, marginLeft: 6 }}>
            <Stack spacing={0.1}>
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{name}</Typography>
              <Typography sx={{ fontSize: 10, fontWeight: 600 }}>KAFKA</Typography>
            </Stack>
            <Stack direction='row' sx={{ mb: 4 }}>
              <MoreButton id={id} name={name} details={details} />
            </Stack>
          </Stack>
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
