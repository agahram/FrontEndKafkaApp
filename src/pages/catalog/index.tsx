import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useState } from 'react'
import ButtonGroup from 'src/@core/theme/overrides/buttonGroup'
import { useTopic } from 'src/context/TopicsContext'
import CreateTopic from 'src/views/pages/catalog/CreateTopic'
import MoreButton from 'src/views/pages/catalog/MoreButton'
import SearchComp from 'src/views/pages/catalog/SearchComp'

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Topic',
    width: 240,
    renderCell: ({ row }: any) => {
      //   console.log(row)
      return <a href=''>{row.name}</a>
    }
  },
  { field: 'partition', headerName: 'Partition', width: 130 },
  {
    field: 'replicationFactor',
    headerName: 'Replicas',
    width: 130
  },
  {
    field: 'topicSize',
    headerName: 'Topic Size',
    width: 130
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
  const { rows } = useTopic()
  let data: any = []
  if (rows !== null && typeof rows === 'object') {
    const val = Object.values(rows)
    data = val.map((obj: any) => {
      return {
        name: obj.name,
        replicationFactor: obj.replicationFactor
      }
    })
  } else {
    console.log('obj is null or undefined')
  }
  console.log(data)
  const filteredData = data.filter((row: { name: string; replicationFactor: number }) => {
    return row.name.toLowerCase().includes(query.toLowerCase())
  })
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
    </>
  )
}
