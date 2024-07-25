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
  const { editTopics } = useTopic()
  const [open, setOpen] = useState(false)
  const [editTopic, setEditTopic] = useState({
    oldName: '',
    newName: ''
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleTopicEdit = () => {
    if (editTopic.newName === '') {
      toast('New Name is required')
    } else {
      editTopics(name, editTopic.newName)
      setEditTopic({
        oldName: '',
        newName: ''
      })
      handleClose()
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    setEditTopic({
      ...editTopic,
      [key]: event.target.value
    })
  }

  return (
    <div>
      <Button
        variant='text'
        sx={{ mr: 2, fontWeight: 401, fontSize: 13, marginLeft: 4, padding: 0.2 }}
        onClick={() => handleClickOpen()}
      >
        <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' height='3em' viewBox='0 0 24 24'>
          <path
            fill='currentColor'
            d='M20.71 7.04c-.34.34-.67.67-.68 1c-.03.32.31.65.63.96c.48.5.95.95.93 1.44s-.53 1-1.04 1.5l-4.13 4.14L15 14.66l4.25-4.24l-.96-.96l-1.42 1.41l-3.75-3.75l3.84-3.83c.39-.39 1.04-.39 1.41 0l2.34 2.34c.39.37.39 1.02 0 1.41M3 17.25l9.56-9.57l3.75 3.75L6.75 21H3z'
          ></path>
        </svg>
        Edit
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ justifyContent: 'center' }}>Create a new topic</DialogTitle>
        <List sx={{ pt: 0, width: 500, display: 'flex', marginTop: -5, justifyContent: 'center' }}>
          <Stack>
            <p>Edit existing topic in your environment.</p>
            <p>Old name</p>
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
                  value={editTopic.newName}
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
            <Button variant='contained' onClick={handleTopicEdit}>
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </div>
  )
}
