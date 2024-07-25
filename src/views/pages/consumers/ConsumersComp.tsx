import { Box, Card, Stack } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'
import CustomChip from 'src/@core/components/mui/chip'
import { useConsumer } from 'src/context/ConsumersContext'
import Chips from './Chips'

const columns: GridColDef[] = [
  {
    flex: 0.1,
    field: 'group',
    minWidth: 280,
    headerName: 'Consumer group'
  },
  {
    flex: 0.25,
    minWidth: 80,
    field: 'state',
    headerName: 'State',
    renderCell: ({ row }: any) => {
      // return <a href='./configuration'>{row.name}</a>
      //   return <Chips label={row.group} />
      //   return <CustomChip label='stable' skin='light' color='success' />
      if (row.state === 'stable') {
        return <CustomChip label='stable' skin='light' color='success' />
      } else if (row.state === 'empty') {
        return <CustomChip label='empty' skin='light' color='warning' />
      } else if (row.state === 'rebalancing') {
        return <CustomChip label='rebalancing' skin='light' color='primary' />
      } else if (row.state === 'dead') {
        return <CustomChip label='dead' skin='light' color='error' />
      }
    }
  },
  {
    flex: 0.25,
    minWidth: 80,
    field: 'consumHostId',
    headerName: 'Coordinator host id'
  }
]

export default function ConsumersComp() {
  const { consumers } = useConsumer()
  let data: any = []

  const val = Object.values(consumers)
  if (val !== null && typeof val === 'object') {
    data = val.map((obj: any) => {
      return {
        group: obj.group,
        state: obj.state
        // consumHostId: obj.port + '-' + obj.brokerId
      }
    })
  } else {
    console.log('obj is null or undefined')
  }
  return (
    <>
      <Card sx={{ padding: 2.5, marginBottom: 2 }}>
        <h3>Consumers</h3>
      </Card>
      <Stack direction='row' spacing={7} sx={{ marginBottom: 2, display: 'flex' }}>
        <Card sx={{ width: 300, padding: 4 }}>
          <p>Stable</p>
          <CustomChip label='' skin='light' color='success' />
        </Card>
        <Card sx={{ width: 300, padding: 4 }}>
          <p>Empty</p>
          <CustomChip label='' skin='light' color='warning' />
        </Card>
        <Card sx={{ width: 300, padding: 4 }}>
          <p>Rebalancing</p>
          <CustomChip label='' skin='light' color='primary' />
        </Card>
        <Card sx={{ width: 300, padding: 4 }}>
          <p>Dead</p>
          <CustomChip label='' skin='light' color='error' />
        </Card>
        <Card sx={{ width: 300, padding: 4 }}>
          <p>Total lag</p>
          <CustomChip label='' skin='light' color='warning' />
        </Card>
      </Stack>
      <Card>
        {/* <SearchComp data={data} query={query} setQuery={setQuery} /> */}
        <Box sx={{ height: 700 }}>
          <DataGrid columns={columns} rows={data} getRowId={item => item.group} />
        </Box>
      </Card>
    </>
  )
}
