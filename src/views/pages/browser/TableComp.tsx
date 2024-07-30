// ** React Imports
import { useEffect, useState, useCallback, ChangeEvent } from 'react'
import Card from '@mui/material/Card'
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { Browser, useBrowser } from 'src/context/BrowserContext'
import Loader from '../catalog/Loader'

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
  const { browsers, consumeMessages, loading } = useBrowser()
  const [currentTopics, setCurrentTopics] = useState<Browser[]>([])

  useEffect(() => {
    if (topicName) {
      consumeMessages(topicName)
    }
  }, [topicName])

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
  let rows: any = []
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Card>
          <DataGrid
            autoHeight
            rows={currentTopics!}
            rowCount={rows.length}
            columns={columns}
            checkboxSelection
            sortingMode='server'
            paginationMode='server'
            pageSizeOptions={[7, 10, 25, 50, 100]}
            getRowId={item => item.timestamp}
            // paginationModel={paginationModel}
            // onSortModelChange={handleSortModel}
            // onPaginationModelChange={setPaginationModel}
            // slotProps={{
            //   baseButton: {
            //     variant: 'outlined'
            //   },
            //   toolbar: {
            //     value: searchValue,
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
