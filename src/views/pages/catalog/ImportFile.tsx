import * as React from 'react'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import Card from '@mui/material/Card'
import { Topic, useTopic } from 'src/context/TopicsContext'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

interface Props {
  data: any
}

interface FileData {
  name: string
  replicationFactor: number
  partitions: number
}

export default function SimpleDialogDemo() {
  const { addTopics } = useTopic()
  const [open, setOpen] = useState(false)
  const [fileData, setFileData] = useState<FileData[]>([
    {
      name: '',
      replicationFactor: 0,
      partitions: 0
    }
  ])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleFileUpload = (e: any) => {
    const reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = e => {
      const data = e.target!.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedData = XLSX.utils.sheet_to_json(sheet)
      setFileData(parsedData as FileData[])
      console.log(fileData)
    }
  }

  const handleClickImport = () => {
    addTopics(fileData as Topic[])
    setOpen(false)
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' height='1.3em' viewBox='0 0 24 24'>
          <path fill='currentColor' d='m12 18l4-5h-3V2h-2v11H8z'></path>
          <path
            fill='currentColor'
            d='M19 9h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2'
          ></path>
        </svg>
        Import
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ justifyContent: 'center' }}>Export a file with topics</DialogTitle>
        <List sx={{ pt: 0, width: 500, display: 'flex', marginTop: -5, justifyContent: 'center' }}>
          <Stack>
            <p>File name</p>
            <input type='file' accept='.xlsx, .xls' onChange={handleFileUpload} />
          </Stack>
        </List>
        <br />
        <Stack spacing={1} sx={{ padding: 5 }}>
          <Stack spacing={1} direction='row' sx={{ justifyContent: 'right' }}>
            <Button variant='contained' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='contained' onClick={handleClickImport}>
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </div>
  )
}
