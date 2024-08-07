import React, { useEffect, useState } from 'react'
import TableComp from './TableComp'
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { useBrowser } from 'src/context/BrowserContext'
import Loader from '../catalog/Loader'
import ProduceComp from './ProduceComp'

export interface BrowserTopic {
  id: any
  name: string
}

export default function BrowserComp() {
  const { isLoading, consumeMessages, handlePagination } = useBrowser()
  const { browserTopics, getBrowserTopics } = useBrowser()
  const [currentTopics, setCurrentTopics] = useState<BrowserTopic[]>()
  const [name, setName] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const [fetchClick, setFetchClick] = useState(false)
  const [searchClick, setSearchClick] = useState<boolean>(false)

  useEffect(() => {
    getBrowserTopics()
  }, [])

  useEffect(() => {
    let data: any = []
    if (browserTopics !== null && typeof browserTopics === 'object') {
      const val = Object.values(browserTopics)
      data = val.map((obj: any) => {
        return {
          name: obj.name,
          id: Date.now().toString(36)
        }
      })
      setCurrentTopics(data)
    }
  }, [browserTopics])

  function handleClick(name: string) {
    setIsClicked(true)
    setName(name)
  }
  function handleFetch() {
    setFetchClick(true)
  }
  useEffect(() => {
    if (name) {
      setSearchClick(false)
      handlePagination({ page: 1, pageSize: 7 }, name)
      setFetchClick(false)
    }
  }, [fetchClick])

  return (
    <div>
      <Box sx={{ justifyContent: 'right', display: 'flex', marginBottom: 3 }}>
        <ProduceComp topicName={name} />
        <Button variant='contained' color='primary' onClick={() => handleFetch()}>
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
              {currentTopics?.map(el => {
                return (
                  <div key={el.id}>
                    <Button variant='text' color='secondary' onClick={() => handleClick(el.name)}>
                      {el.name}
                    </Button>
                  </div>
                )
              })}
            </CardContent>
          </Card>
          {isClicked || fetchClick ? (
            <TableComp topicName={name} searchClick={searchClick} setSearchClick={setSearchClick} />
          ) : (
            <></>
          )}
        </Box>
      )}
    </div>
  )
}
