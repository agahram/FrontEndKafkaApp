import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { useTopic } from 'src/context/TopicsContext'
import CreateTopic from 'src/views/pages/catalog/CreateTopic'
import Loader from 'src/views/pages/catalog/Loader'
import MoreButton from 'src/views/pages/catalog/MoreButton'
import SearchComp from 'src/views/pages/catalog/SearchComp'
import TopicConfig from 'src/views/pages/catalog/configuration/TopicConfig'

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Topic',
    width: 280,
    renderCell: ({ row }: any) => {
      // return <a href='./configuration'>{row.name}</a>
      return <TopicConfig name={row.name} />
    }
  },
  { field: 'partition', headerName: 'Partition', width: 280 },
  {
    field: 'replicationFactor',
    headerName: 'Replicas',
    width: 180
  },
  {
    field: 'topicSize',
    headerName: 'Topic Size',
    width: 180
  },
  {
    field: 'more',
    headerName: '',
    width: 80,
    renderCell: ({ row }: any) => {
      //   console.log(row)
      return <MoreButton name={row.name} />
    }
  }
]

export default function index() {
  const [query, setQuery] = useState('')
  const { topics, isLoading } = useTopic()
  let data: any = []
  let size = 0
  let sizeName = ''
  let count = 0
  if (topics !== null && typeof topics === 'object') {
    const val = Object.values(topics)
    data = val.map((obj: any) => {
      function topicSizeFunc() {
        count = 0
        size = 0
        sizeName = ''
        for (let i = 0; i < obj.partitions.length; i++) {
          size += obj.partitions[i].size
        }
        while (size > 1000) {
          size /= 1000
          count += 1
        }
        // return size
        if (count == 0) {
          sizeName = 'bytes'
          return size + ' ' + sizeName
        } else if (count == 1) {
          sizeName = 'kilobytes'
          return size + ' ' + sizeName
        } else if (count == 2) {
          sizeName = 'megabytes'
          return size + ' ' + sizeName
        } else if (count == 3) {
          sizeName = 'gigabytes'
          return size + ' ' + sizeName
        }
      }
      return {
        name: obj.name,
        replicationFactor: obj.replicationFactor,
        partition: obj.partitions.length,
        topicSize: topicSizeFunc()
      }
    })
  } else {
    console.log('obj is null or undefined')
  }
  console.log(data)
  const filteredData = data.filter(
    (topic: { name: string; replicationFactor: number; partitions: number; topicSize: string }) => {
      return topic.name.toLowerCase().includes(query.toLowerCase())
    }
  )
  return (
    <>
      <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
        <Button variant='outlined'>
          <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' height='1.3em' viewBox='0 0 256 256'>
            <path
              fill='currentColor'
              d='M220 112v96a20 20 0 0 1-20 20H56a20 20 0 0 1-20-20v-96a20 20 0 0 1 20-20h20a12 12 0 0 1 0 24H60v88h136v-88h-16a12 12 0 0 1 0-24h20a20 20 0 0 1 20 20M96.49 72.49L116 53v83a12 12 0 0 0 24 0V53l19.51 19.52a12 12 0 1 0 17-17l-40-40a12 12 0 0 0-17 0l-40 40a12 12 0 1 0 17 17Z'
            ></path>
          </svg>
          Export
        </Button>
        <Button variant='outlined'>
          <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' height='1.3em' viewBox='0 0 24 24'>
            <path fill='currentColor' d='m12 18l4-5h-3V2h-2v11H8z'></path>
            <path
              fill='currentColor'
              d='M19 9h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2'
            ></path>
          </svg>
          Import
        </Button>
        <CreateTopic />
      </Stack>
      <SearchComp data={data} query={query} setQuery={setQuery} />
      {isLoading ? (
        <Loader />
      ) : (
        <Card>
          <Box sx={{ height: 700 }}>
            <DataGrid
              columns={columns}
              rows={filteredData}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 50 }
                }
              }}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              getRowId={item => item.name}
            />
          </Box>
        </Card>
      )}
    </>
  )
}
