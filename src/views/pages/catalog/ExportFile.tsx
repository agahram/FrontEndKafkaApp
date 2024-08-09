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
import { useTopic } from 'src/context/TopicsContext'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

interface Props {
  data: any
}

export default function SimpleDialogDemo({ data }: Props) {
  const { addTopic } = useTopic()
  const [open, setOpen] = useState(false)
  const [fileName, setFileName] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFileName(event.target.value)
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, `${fileName}.xlsx`)
    setOpen(false)
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' height='1.3em' viewBox='0 0 256 256'>
          <path
            fill='currentColor'
            d='M220 112v96a20 20 0 0 1-20 20H56a20 20 0 0 1-20-20v-96a20 20 0 0 1 20-20h20a12 12 0 0 1 0 24H60v88h136v-88h-16a12 12 0 0 1 0-24h20a20 20 0 0 1 20 20M96.49 72.49L116 53v83a12 12 0 0 0 24 0V53l19.51 19.52a12 12 0 1 0 17-17l-40-40a12 12 0 0 0-17 0l-40 40a12 12 0 1 0 17 17Z'
          ></path>
        </svg>
        &nbsp;Export
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ justifyContent: 'center' }}>Choose a name for export file</DialogTitle>
        <List sx={{ pt: 0, width: 500, display: 'flex', marginTop: -5, justifyContent: 'center' }}>
          <Stack>
            <p>File name</p>
            <div>
              <form noValidate autoComplete='off'>
                <FormControl sx={{ width: '45ch' }}>
                  <OutlinedInput placeholder='Name' onChange={e => handleInputChange(e)} />
                </FormControl>
              </form>
            </div>
          </Stack>
        </List>
        <br />
        <Stack spacing={1} sx={{ padding: 5 }}>
          <Stack spacing={1} direction='row' sx={{ justifyContent: 'right' }}>
            <Button variant='contained' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='contained' onClick={exportToExcel}>
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </div>
  )
}
