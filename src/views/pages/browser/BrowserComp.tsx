import React, { useEffect, useState } from 'react'
import TableComp from './TableComp'
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useBrowser } from 'src/context/BrowserContext'
import Loader from '../catalog/Loader'

export interface BrowserTopic {
  name: string
}

export default function BrowserComp() {
  const { isLoading } = useBrowser()
  const { browserTopics, getBrowserTopics } = useBrowser()
  const [currentTopics, setCurrentTopics] = useState<BrowserTopic[]>()
  const [name, setName] = useState('')
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    getBrowserTopics()
  }, [])

  useEffect(() => {
    let data: any = []
    if (browserTopics !== null && typeof browserTopics === 'object') {
      const val = Object.values(browserTopics)
      data = val.map((obj: any) => {
        return {
          name: obj.name
        }
      })
      console.log(data)
      setCurrentTopics(data)
    }
  }, [browserTopics])

  function handleClick(name: string) {
    setIsClicked(true)
    setName(name)
  }
  return (
    <div>
      <Box sx={{ justifyContent: 'right', display: 'flex' }}>
        <Button variant='outlined' color='secondary'>
          <svg xmlns='http://www.w3.org/2000/svg' width='2em' height='2em' viewBox='0 0 32 32'>
            <path
              fill='currentColor'
              d='M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5z'
            ></path>
          </svg>
          Produce
        </Button>
        <Button variant='contained' color='primary'>
          <svg xmlns='http://www.w3.org/2000/svg' width='1.5em' height='1.5em' viewBox='0 0 256 256'>
            <path
              fill='currentColor'
              d='M232.4 114.49L88.32 26.35a16 16 0 0 0-16.2-.3A15.86 15.86 0 0 0 64 39.87v176.26A15.94 15.94 0 0 0 80 232a16.07 16.07 0 0 0 8.36-2.35l144.04-88.14a15.81 15.81 0 0 0 0-27ZM80 215.94V40l143.83 88Z'
            ></path>
          </svg>
          Fetch
        </Button>
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Card sx={{ width: 250, marginRight: 5 }}>
            <CardContent sx={{ pt: 8, display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
              <Typography variant='h6'>Topics</Typography>
              <Stack>
                {currentTopics?.map(el => {
                  return (
                    <>
                      <Button variant='text' color='secondary' onClick={() => handleClick(el.name)}>
                        {el.name}
                      </Button>
                    </>
                  )
                })}
              </Stack>
            </CardContent>
          </Card>
          {isClicked ? <TableComp topicName={name} /> : <></>}
        </Box>
      )}
    </div>
  )
}
