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
import toast from 'react-hot-toast'

interface Props {
  name: string
}

export default function SimpleDialogDemo({ name }: Props) {
  const { cloneTopics } = useTopic()
  const [open, setOpen] = useState(false)
  const [cloneTopic, setCloneTopic] = useState({
    oldName: '',
    newName: ''
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleTopicCreation = () => {
    if (cloneTopic.newName === '') {
      toast('New Name is required')
    } else {
      cloneTopics(name, cloneTopic.newName)
      setCloneTopic({
        oldName: '',
        newName: ''
      })
      handleClose()
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    setCloneTopic({
      ...cloneTopic,
      [key]: event.target.value
    })
  }

  return (
    <div>
      <Button
        variant='text'
        sx={{ mr: 2, fontWeight: 401, fontSize: 13, padding: 1 }}
        onClick={() => handleClickOpen()}
      >
        <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' height='3em' viewBox='0 0 256 256'>
          <path
            fill='currentColor'
            fillRule='evenodd'
            d='M47.81 91.725c0-8.328 6.539-15.315 15.568-15.33c9.03-.016 14.863.015 14.863.015s-.388-8.9-.388-15.978c0-7.08 6.227-14.165 15.262-14.165s92.802-.26 101.297.37c8.495.63 15.256 5.973 15.256 14.567c0 8.594-.054 93.807-.054 101.7c0 7.892-7.08 15.063-15.858 15.162c-8.778.1-14.727-.1-14.727-.1s.323 9.97.323 16.094c0 6.123-7.12 15.016-15.474 15.016s-93.117.542-101.205.542c-8.088 0-15.552-7.116-15.207-15.987c.345-8.871.345-93.58.345-101.906zm46.06-28.487l-.068 98.164c0 1.096.894 1.99 1.999 1.984l95.555-.51a2.007 2.007 0 0 0 1.998-2.01l-.064-97.283a2.01 2.01 0 0 0-2.01-2.007l-95.4-.326a1.99 1.99 0 0 0-2.01 1.988M63.268 95.795l.916 96.246a2.007 2.007 0 0 0 2.02 1.982l94.125-.715a3.976 3.976 0 0 0 3.953-4.026l-.137-11.137s-62.877.578-71.054.578s-15.438-7.74-15.438-16.45c0-8.71.588-68.7.588-68.7c.01-1.1-.874-1.99-1.976-1.975l-9.027.13a4.025 4.025 0 0 0-3.97 4.067'
          ></path>
        </svg>
        Duplicate
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ justifyContent: 'center' }}>Create a new topic</DialogTitle>
        <List sx={{ pt: 0, width: 500, display: 'flex', marginTop: -5, justifyContent: 'center' }}>
          <Stack>
            <p>Clone existing topic in your environment.</p>
            <p>Enter old name</p>
            <div>
              <form noValidate autoComplete='off'>
                <FormControl sx={{ width: '45ch' }}>
                  <OutlinedInput
                    placeholder='oldName'
                    defaultValue={name}
                    value={name}
                    onChange={e => handleInputChange(e, 'oldName')}
                    disabled
                  />
                </FormControl>
              </form>
            </div>
          </Stack>
        </List>
        <Stack sx={{ pt: 0, width: 500, padding: 5 }}>
          <p>Enter new name</p>
          <div>
            <form noValidate autoComplete='off'>
              <FormControl sx={{ width: '45ch' }}>
                <OutlinedInput
                  placeholder='newName'
                  value={cloneTopic.newName}
                  onChange={e => handleInputChange(e, 'newName')}
                />
              </FormControl>
            </form>
          </div>
        </Stack>
        <br />
        <Stack spacing={1} sx={{ padding: 5 }}>
          <Stack spacing={1} direction='row' sx={{ justifyContent: 'right' }}>
            <Button variant='contained' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='contained' onClick={handleTopicCreation}>
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </div>
  )
}
