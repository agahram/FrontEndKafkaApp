// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'
import Card from '@mui/material/Card'
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { Browser, useBrowser } from 'src/context/BrowserContext'
import Loader from '../catalog/Loader'
import ServerSideToolbar from 'src/views/pages/browser/ServerSideToolbar'
import {
  Box,
  Button,
  CardHeader,
  Icon,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'

const columns: GridColDef[] = [
  {
    flex: 0.175,
    minWidth: 200,
    field: 'timestamp',
    headerName: 'Timestamp'
  },
  {
    flex: 0.175,
    type: 'number',
    minWidth: 200,
    headerName: 'Partitions',
    field: 'partitions'
  },
  {
    flex: 0.175,
    minWidth: 200,
    field: 'offset',
    headerName: 'Offset'
  },
  {
    flex: 0.175,
    field: 'key',
    minWidth: 80,
    headerName: 'Key'
  },
  {
    flex: 0.175,
    minWidth: 140,
    field: 'value',
    headerName: 'Value'
  }
]

interface Props {
  topicName?: string
}

const TableServerSide = ({ topicName }: Props) => {
  const { browsers, consumeMessages, loading, searchByPartitions, searchLoad } = useBrowser()
  const [currentTopics, setCurrentTopics] = useState<Browser[]>([])
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 7,
    page: 1
  })
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchOption, setSearchOption] = useState<string>('')

  useEffect(() => {
    if (topicName) {
      consumeMessages(topicName)
    }
  }, [topicName])

  useEffect(() => {
    if (topicName && searchOption === 'partition' && searchValue) {
      setTimeout(() => {
        searchByPartitions(topicName, Number(searchValue))
      }, 2000)
    }
    if (topicName) {
      consumeMessages(topicName)
    }
  }, [searchValue])

  // useEffect(() => {
  //   if (paginationModel && topicName) {
  //     handlePagination(paginationModel, topicName)
  //     console.log(browsers)
  //   }
  // }, [paginationModel])

  useEffect(() => {
    let data: any = []
    if (browsers !== null && typeof browsers === 'object') {
      data = browsers.map((obj: any) => {
        return {
          key: obj.message.key,
          value: obj.message.value,
          timestamp: obj.message.timestamp.utcDateTime,
          partitions: obj.partition,
          offset: obj.offset
        }
      })
      console.log(data)

      setCurrentTopics(data)
    }
  }, [browsers])

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  const handleSelectSearch = (value: string) => {
    // setSearchOption(value)
    console.log(value)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSearchOption(event.target.value)
  }

  return (
    <>
      {loading || searchLoad ? (
        <Loader />
      ) : (
        <Card>
          <Box
            sx={{
              gap: 2,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'start',
              p: theme => theme.spacing(2, 5, 4, 5)
            }}
          >
            <TextField
              size='small'
              value={searchValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)}
              placeholder='Search'
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 2, display: 'flex' }}>{/* <Icon icon='mdi:magnify' fontSize={20} /> */}</Box>
                )
              }}
              sx={{
                width: {
                  xs: 1,
                  sm: 'auto'
                },
                '& .MuiInputBase-root > svg': {
                  mr: 2
                }
              }}
            />
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={searchOption}
              label=''
              onChange={handleChange}
              sx={{ height: 40 }}
            >
              <MenuItem value='key'>key</MenuItem>
              <MenuItem value='header'>header</MenuItem>
              <MenuItem value='timestamp'>timestamp</MenuItem>
              <MenuItem value='partition'>partition</MenuItem>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant='contained' sx={{ width: 130 }} onClick={() => handleSelectSearch(searchOption)}>
                  Select
                </Button>
              </Box>
            </Select>
          </Box>
          <DataGrid
            autoHeight
            rows={currentTopics!}
            rowCount={currentTopics!.length}
            columns={columns}
            checkboxSelection
            pageSizeOptions={[7, 10, 25, 50, 100]}
            getRowId={item => item.timestamp}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            // slots={{ toolbar: ServerSideToolbar }}
            // slotProps={{
            //   baseButton: {
            //     variant: 'outlined'
            //   },
            //   toolbar: {
            //     value: searchValue,
            //     searchOption: searchOption,
            //     clearSearch: () => handleSearch(''),
            //     onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
            //   }
            // }}
          />
        </Card>
      )}
    </>
  )
}

export default TableServerSide
