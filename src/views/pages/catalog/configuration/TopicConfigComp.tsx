import { Breadcrumbs, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import React, { use, useEffect, useState } from 'react'
import { object } from 'yup'
import Breadcrumb from 'src/views/pages/catalog/configuration/Breadcrumb'
import SearchComp from 'src/views/pages/connections/details/SearchComp'
import { useTopic } from 'src/context/TopicsContext'
import CustomChip from 'src/@core/components/mui/chip'
import Loader from '../Loader'

// ** Data Import

interface Props {
  topicName: string
}

const columns: GridColDef[] = [
  {
    flex: 0.1,
    field: 'name',
    minWidth: 280,
    headerName: 'Name'
  },
  {
    flex: 0.25,
    minWidth: 80,
    field: 'value',
    headerName: 'Value'
  }
]

export default function TopicConfigComp({ topicName }: Props) {
  const [query, setQuery] = useState('')
  const { getTopicConfig, getTopic, topic, rows } = useTopic()
  let data: any = []
  let topicSize = ''
  let retention = 0

  useEffect(() => {
    if (topicName) {
      getTopicConfig(topicName)
    }
  }, [topicName])
  useEffect(() => {
    if (topicName) {
      getTopic(topicName)
    }
  }, [topicName])
  if (rows !== null && typeof rows === 'object') {
    const val = Object.values(rows).find(item => item)
    const finalObj = Object.values(val.entries)
    data = finalObj.map((obj: any) => {
      if (obj.name === 'retention.ms') {
        retention = obj.value / 86400000
      }
      console.log('ms:', retention)

      return {
        name: obj.name,
        value: obj.value
      }
    })
  } else {
    console.log('obj is null or undefined')
  }
  console.log(data)
  const filteredData = data.filter((row: { name: string }) => {
    return row.name.toLowerCase().includes(query.toLowerCase())
  })

  if (topic !== undefined && typeof topic === 'object') {
    const val = Object.values(topic)
    console.log(val)
    let count = 0
    let size = 0
    let sizeName = ''
    if (topic) {
      topicSize = ''
      for (let i = 0; i < topic.partitions.length; i++) {
        size += topic.partitions[i].size
      }
      while (size > 1000) {
        size /= 1000
        count += 1
      }
      // return size
      if (count == 0) {
        sizeName = 'bytes'
        topicSize = size + ' ' + sizeName
      } else if (count == 1) {
        sizeName = 'kilobytes'
        topicSize = size + ' ' + sizeName
      } else if (count == 2) {
        sizeName = 'megabytes'
        topicSize = size + ' ' + sizeName
      } else if (count == 3) {
        sizeName = 'gigabytes'
        topicSize = size + ' ' + sizeName
      }
    }
  } else {
    console.log('obj is null or undefined')
  }
  return (
    <>
      <Card sx={{ padding: 4, marginBottom: 2 }}>
        <Breadcrumb />
      </Card>
      <Stack direction='row' spacing={7} sx={{ marginBottom: 2, display: 'flex' }}>
        <Card sx={{ width: 300, padding: 5 }}>
          <p>Records</p>
          <CustomChip label={topic!.recordsCount} skin='light' color='primary' />
        </Card>
        <Card sx={{ width: 300, padding: 5 }}>
          <p>Partitions</p>
          <CustomChip label={topic!.partitions.length} skin='light' color='primary' />
        </Card>
        <Card sx={{ width: 300, padding: 5 }}>
          <p>Topic Size</p>
          <CustomChip label={topicSize} skin='light' color='primary' />
        </Card>
        <Card sx={{ width: 300, padding: 5 }}>
          <p>Retention</p>
          <CustomChip label={retention + ' days'} skin='light' color='primary' />
        </Card>
        <Card sx={{ width: 300, padding: 5 }}>
          <p>Replication Factor</p>
          <CustomChip label={topic!.replicationFactor} skin='light' color='primary' />
        </Card>
      </Stack>
      <Card>
        <SearchComp data={data} query={query} setQuery={setQuery} />
        <Box sx={{ height: 700 }}>
          <DataGrid columns={columns} rows={filteredData} getRowId={item => item.name} />
        </Box>
      </Card>
    </>
  )
}
