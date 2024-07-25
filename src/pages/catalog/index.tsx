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
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import ExportFile from 'src/views/pages/catalog/ExportFile'
import ImportFile from 'src/views/pages/catalog/ImportFile'

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
        <ExportFile data={data} />
        <ImportFile />
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
