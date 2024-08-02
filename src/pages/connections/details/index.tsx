import { Breadcrumbs } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import React, { useState } from 'react'
import { useConnection } from 'src/context/ConnectionsContext'
import { object } from 'yup'
import Breadcrumb from 'src/views/pages/connections/details/Breadcrumb'
import SearchComp from 'src/views/pages/catalog/SearchComp'

// ** Data Import

const columns: GridColDef[] = [
  {
    flex: 0.1,
    field: 'name',
    minWidth: 80,
    headerName: 'Name'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'value',
    headerName: 'Value'
  }
]

export default function index() {
  const [query, setQuery] = useState('')
  let data: any = []
  const { rows } = useConnection()
  if (rows !== null && typeof rows === 'object') {
    const val = Object.values(rows).find(item => item)
    const finalObj = Object.values(val.entries)
    data = finalObj.map((obj: any) => {
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
  return (
    <Card>
      <SearchComp setQuery={setQuery} />
      <CardHeader title={<Breadcrumb />} />
      <Box sx={{ height: 800 }}>
        <DataGrid columns={columns} rows={filteredData} getRowId={item => item.name} />
      </Box>
    </Card>
  )
}
