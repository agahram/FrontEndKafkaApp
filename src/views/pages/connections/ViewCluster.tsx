import Button from '@mui/material/Button'
import React from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useConnection } from 'src/context/ConnectionsContext'
import { useRouter } from 'next/router'

interface Props {
  name: string
}

export default function ViewCluster({ name }: Props) {
  const { getClusterInfo } = useConnection()
  const router = useRouter()

  function handleClusterDetails() {
    router.push('/connections/details')
  }
  return (
    <div>
      <Button variant='outlined' sx={{ mr: 2, fontWeight: 401 }} fullWidth onClick={() => handleClusterDetails()}>
        View cluster details
      </Button>
    </div>
  )
}
