import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import CustomChip from 'src/@core/components/mui/chip'
import { Consumer, useConsumer } from 'src/context/ConsumersContext'
import Chips from './Chips'
import { log } from 'console'
import { color } from '@mui/system'
import SearchComp from '../catalog/SearchComp'
import Loader from '../catalog/Loader'

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
      if (row.state === 'Stable') {
        return <CustomChip label='stable' skin='light' color='success' />
      } else if (row.state === 'Empty') {
        return <CustomChip label='empty' skin='light' color='warning' />
      } else if (row.state === 'Rebalancing') {
        return <CustomChip label='rebalancing' skin='light' color='primary' />
      } else if (row.state === 'Dead') {
        return <CustomChip label='dead' skin='light' color='error' />
      }
    }
  },
  {
    flex: 0.25,
    minWidth: 80,
    field: 'overallLag',
    headerName: 'Overall Lag'
  },
  {
    flex: 0.25,
    minWidth: 80,
    field: 'consumHostId',
    headerName: 'Coordinator host id'
  },
  {
    flex: 0.25,
    minWidth: 80,
    field: 'topics',
    headerName: 'Topics',
    renderCell: ({ row }: any) => {
      return <CustomChip label={row.assignedTopics} skin='light' color='primary' />
    }
  }
]

export default function ConsumersComp() {
  const { consumers, getConsumers, isLoading } = useConsumer()
  const [query, setQuery] = useState('')
  const [currentData, setCurrentData] = useState<Consumer[]>([])
  const [state, setState] = useState({
    stable: 0,
    empty: 0,
    rebalancing: 0,
    dead: 0
  })
  const [totalLag, setTotallLag] = useState(0)
  let data: any = []
  useEffect(() => {
    getConsumers()
  }, [])
  console.log('STATE', state)

  console.log('******')

  useEffect(() => {
    if (consumers !== null && typeof consumers === 'object') {
      const val = Object.values(consumers)
      setState({
        stable: 0,
        empty: 0,
        rebalancing: 0,
        dead: 0
      })

      data = val.map((obj: any) => {
        if (obj.state === 'Stable') {
          setState({ ...state, stable: state.stable + 1 })
        } else if (obj.state === 'Empty') {
          setState({ ...state, empty: state.empty + 1 })
        } else if (obj.state === 'Rebalancing') {
          setState({ ...state, rebalancing: state.rebalancing + 1 })
        } else if (obj.state === 'Dead') {
          setState({ ...state, dead: state.dead + 1 })
        }
        setTotallLag(totalLag + obj.overallLag)
        setCurrentData([
          {
            group: obj.group,
            state: obj.state,
            consumHostId: obj.host + ':' + obj.port + ' - ' + obj.brokerId,
            overallLag: obj.overallLag,
            assignedTopics: obj.assignedTopics
          }
        ])

        return obj
      })
    }
  }, [consumers])

  // const filteredData = consumers.filter(
  //   (consumer: { group: string; state: string; overallLag: number; consumHostId: string }) => {
  //     return consumer.group.toLowerCase().includes(query.toLowerCase())
  //   }
  // )
  // useEffect(() => {
  //   let search_data = consumers.filter(
  //     (consumer: { group: string; state: string; overallLag: number; consumHostId: string }) => {
  //       consumer.group.toLowerCase().includes(query.toLowerCase())
  //     }
  //   )
  //   setCurrentData(search_data)
  // }, [consumers])

  function handleShow(consumerState: string) {
    let show_data = consumers.filter(
      (consumer: { group: string; state: string; overallLag: number; consumHostId: string }) =>
        consumer.state === consumerState
    )

    setCurrentData(show_data)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Card sx={{ padding: 2.5, marginBottom: 2 }}>
            <h2>Consumers</h2>
          </Card>
          <Stack direction='row' spacing={7} sx={{ marginBottom: 2, display: 'flex' }}>
            <Card sx={{ width: 300, padding: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <p style={{ color: '#787eff', fontWeight: 600 }}>Stable</p>
                <Button variant='outlined' color='secondary' sx={{ height: 25 }} onClick={() => handleShow('Stable')}>
                  Show
                </Button>
              </Box>
              <CustomChip label={state.stable} skin='light' color='success' />
            </Card>
            <Card sx={{ width: 300, padding: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <p style={{ color: '#787eff', fontWeight: 600 }}>Empty</p>
                <Button variant='outlined' color='secondary' sx={{ height: 25 }} onClick={() => handleShow('Empty')}>
                  Show
                </Button>
              </Box>
              <CustomChip label={state.empty} skin='light' color='warning' />
            </Card>
            <Card sx={{ width: 300, padding: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <p style={{ color: '#787eff', fontWeight: 600 }}>Rebalancing</p>
                <Button
                  variant='outlined'
                  color='secondary'
                  sx={{ height: 25 }}
                  onClick={() => handleShow('Rebalancing')}
                >
                  Show
                </Button>
              </Box>
              <CustomChip label={state.rebalancing} skin='light' color='primary' />
            </Card>
            <Card sx={{ width: 300, padding: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <p style={{ color: '#787eff', fontWeight: 600 }}>Dead</p>
                <Button variant='outlined' color='secondary' sx={{ height: 25 }} onClick={() => handleShow('Dead')}>
                  Show
                </Button>
              </Box>
              <CustomChip label={state.dead} skin='light' color='error' />
            </Card>
            <Card sx={{ width: 300, padding: 4 }}>
              <p style={{ color: '#787eff', fontWeight: 600 }}>Total lag</p>
              <CustomChip label={totalLag} skin='light' color='warning' />
            </Card>
          </Stack>
          <Card>
            <SearchComp data={data} query={query} setQuery={setQuery} />
            <Box sx={{ height: 700 }}>
              <DataGrid columns={columns} rows={currentData} getRowId={item => item.group} />
            </Box>
          </Card>
        </>
      )}
    </>
  )
}
