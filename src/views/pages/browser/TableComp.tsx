// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent, SetStateAction } from 'react'
import Card from '@mui/material/Card'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId, GridSortModel } from '@mui/x-data-grid'
import { Browser, useBrowser } from 'src/context/BrowserContext'
import Loader from '../catalog/Loader'
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'
import {
  Box,
  Button,
  CardHeader,
  Checkbox,
  IconButton,
  ListItemText,
  MenuItem,
  PopperPlacementType,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import SideComp from './SideComp'

const columns: GridColDef[] = [
  {
    flex: 0.175,
    minWidth: 300,
    field: 'timestamp',
    headerName: 'Timestamp'
  },
  {
    flex: 0.175,
    type: 'number',
    minWidth: 120,
    headerName: 'Partitions',
    field: 'partitions'
  },
  {
    flex: 0.175,
    minWidth: 120,
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
  const {
    browsers,
    consumeMessages,
    loading,
    searchByPartitions,
    searchLoad,
    searchByKeys,
    searchByDatetime,
    searchByHeaders
  } = useBrowser()
  const [currentTopics, setCurrentTopics] = useState<Browser[]>([])
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 7,
    page: 1
  })
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchOption, setSearchOption] = useState<string>('')
  const [searchClick, setSearchClick] = useState<boolean>(false)
  const [checked, setChecked] = useState(false)
  const [searchRequest, setSearchRequest] = useState<string[]>([])
  const [idArr, setIdArr] = useState<string[]>([])
  const [showSide, setShowSide] = useState(false)
  const [placement, setPlacement] = useState<PopperPlacementType>()
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])

  console.log('Browsers: ', currentTopics)

  useEffect(() => {
    idArr.length !== 0 ? setShowSide(true) : setShowSide(false)
    setPlacement('left')
  }, [idArr])

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  useEffect(() => {
    if (topicName) {
      consumeMessages(topicName)
    }
  }, [topicName])

  useEffect(() => {
    setSearchOption('')
    setSearchValue('')
    let array: SetStateAction<string[]> = []
    if (topicName && searchValue) {
      if (searchOption === 'partition') {
        searchByPartitions(topicName, Number(searchValue))
      } else if (searchOption === 'key') {
        toast('Write all the keys with , separator')

        let keySearchValue = searchValue.split(',')

        array = keySearchValue

        searchByKeys(keySearchValue, topicName, checked)
      } else if (searchOption === 'timestamp') {
        toast('Write time range with - separator')

        let timestampSearchValue = searchValue.split('-')

        array = timestampSearchValue

        searchByDatetime(topicName, timestampSearchValue[0], timestampSearchValue[1])
      } else if (searchOption === 'header') {
        toast('Write headers value and keys with , separator')

        let headerSearchValue = searchValue.split(',')

        array = headerSearchValue
        searchByHeaders(headerSearchValue, topicName, checked)
      }
      setSearchRequest(array)
    }
    setSearchClick(false)
  }, [searchClick])

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
      setCurrentTopics(data)
    }
  }, [browsers])

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  const handleSelectSearch = () => {
    setSearchClick(true)
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
              p: theme => theme.spacing(4, 5, 4, 5)
            }}
          >
            <TextField
              size='small'
              value={searchValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)}
              placeholder='Search'
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 2, display: 'flex' }}>
                    <Icon icon='mdi:magnify' />
                  </Box>
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
            <Select value={searchOption} label='' onChange={handleChange} sx={{ height: 40 }}>
              <MenuItem value='key'>
                <ListItemText primary='key' />
              </MenuItem>

              <MenuItem value='header'>
                <ListItemText primary='header' />
              </MenuItem>
              <MenuItem value='timestamp'>
                <ListItemText primary='timestamp' />
              </MenuItem>
              <MenuItem value='partition'>
                <ListItemText primary='partition' />
              </MenuItem>
            </Select>
            {searchOption === 'key' || searchOption === 'header' ? (
              <Checkbox checked={checked} onChange={handleCheck} sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
            ) : (
              <></>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' color='secondary' sx={{ width: 130 }} onClick={() => handleSelectSearch()}>
                Search
              </Button>
            </Box>
          </Box>
          <Box>
            {showSide ? (
              <SideComp
                open={showSide}
                placement={placement}
                topicName={topicName!}
                currentTopics={currentTopics}
                idArr={idArr}
              />
            ) : (
              <></>
            )}
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
              // rowSelectionModel={selectionModel}
              // onRowSelectionModelChange={selection => {
              //   setIdArr(selection as string[])
              //   if (selection.length > 1) {
              //     const selectionSet = new Set(selectionModel)
              //     const result = selection.filter((s: GridRowId) => !selectionSet.has(s))

              //     setSelectionModel(result)
              //   } else {
              //     setSelectionModel(selection)
              //   }
              // }}
              onRowSelectionModelChange={selection => {
                setIdArr(selection as string[])
              }}
            />
          </Box>
        </Card>
      )}
    </>
  )
}

export default TableServerSide
