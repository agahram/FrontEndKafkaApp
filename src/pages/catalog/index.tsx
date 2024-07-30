import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Topic, useTopic } from 'src/context/TopicsContext'
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
    width: 300,
    renderCell: ({ row }: any) => {
      // return <a href='./configuration'>{row.name}</a>
      return <TopicConfig name={row.name} />
    }
  },
  { field: 'partitions', headerName: 'Partition', width: 280 },
  {
    field: 'replicationFactor',
    headerName: 'Replicas',
    width: 250
  },
  {
    field: 'topicSize',
    headerName: 'Topic Size',
    width: 420
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
  const { topics, isLoading, getTopics } = useTopic()
  const [currentData, setCurrentData] = useState<Topic[]>([])

  let size = 0
  let sizeName = ''
  let count = 0

  useEffect(() => {
    getTopics()
  }, [])
  useEffect(() => {
    if (topics !== null && typeof topics === 'object') {
      let data: any = []
      const val = Object.values(topics)
      data = val.map((obj: any) => {
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
        if (count == 0) {
          sizeName = 'bytes'
        } else if (count == 1) {
          sizeName = 'kilobytes'
        } else if (count == 2) {
          sizeName = 'megabytes'
        } else if (count == 3) {
          sizeName = 'gigabytes'
        }
        return {
          name: obj.name,
          replicationFactor: obj.replicationFactor,
          partitions: obj.partitions.length,
          topicSize: `${size} ${sizeName}`
        }
      })
      setCurrentData(data)
    } else {
      console.log('obj is null or undefined')
    }
  }, [topics])
  useEffect(() => {
    let search_data = topics.filter((topic: any) => {
      return topic.name.toLowerCase().includes(query.toLowerCase())
    })
    let newData = search_data.map((obj: any) => {
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

      if (count == 0) {
        sizeName = 'bytes'
      } else if (count == 1) {
        sizeName = 'kilobytes'
      } else if (count == 2) {
        sizeName = 'megabytes'
      } else if (count == 3) {
        sizeName = 'gigabytes'
      }
      return {
        name: obj.name,
        replicationFactor: obj.replicationFactor,
        partitions: obj.partitions.length,
        topicSize: `${size} ${sizeName}`
      }
    })
    setCurrentData(newData)
  }, [query])
  return (
    <>
      <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
        <ExportFile data={currentData} />
        <ImportFile />
        <CreateTopic />
      </Stack>
      <SearchComp setQuery={setQuery} />
      {isLoading ? (
        <Loader />
      ) : (
        <Card>
          <Box sx={{ height: 700 }}>
            <DataGrid
              columns={columns}
              rows={currentData}
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
