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

export default function SimpleDialogDemo() {
  const { addTopic } = useTopic()
  const [open, setOpen] = useState(false)
  const [newTopic, setNewTopic] = useState({
    name: '',
    replicationFactor: 0,
    partitions: 0
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleTopicCreation = () => {
    if (newTopic.name.length === 0) {
      toast('Topic name is required')
    }
    if (Number(newTopic.replicationFactor) !== 1) {
      toast('Replication factor should equal to 1')
    }
    if (Number(newTopic.partitions) === 0) {
      toast('Partitions should be more than one')
    } else {
      addTopic({
        name: newTopic.name,
        replicationFactor: newTopic.replicationFactor,
        partitions: newTopic.partitions
      })
      setNewTopic({
        name: '',
        replicationFactor: 0,
        partitions: 0
      })
      handleClose()
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    setNewTopic({
      ...newTopic,
      [key]: event.target.value
    })
  }

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen}>
        <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' height='1.3em' viewBox='0 0 24 24'>
          <path fill='currentColor' d='M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z'></path>
        </svg>
        Create topic
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{ justifyContent: 'center' }}>Create a new topic</DialogTitle>
        <List sx={{ pt: 0, width: 500, display: 'flex', marginTop: -5, justifyContent: 'center' }}>
          <Stack>
            <p>Create a new topic in your environment.</p>
            <p>Name</p>
            <div>
              <form noValidate autoComplete='off'>
                <FormControl sx={{ width: '45ch' }}>
                  <OutlinedInput
                    placeholder='Name'
                    value={newTopic.name}
                    onChange={e => handleInputChange(e, 'name')}
                  />
                </FormControl>
              </form>
            </div>
          </Stack>
        </List>
        <Stack sx={{ pt: 0, width: 500, padding: 5 }}>
          <p>Configuration</p>
          <p>Partitions</p>
          <div>
            <form noValidate autoComplete='off'>
              <FormControl sx={{ width: '45ch' }}>
                <OutlinedInput
                  type='number'
                  value={newTopic.partitions}
                  onChange={e => handleInputChange(e, 'partitions')}
                />
              </FormControl>
            </form>
          </div>
          <p>Replications</p>
          <div>
            <form noValidate autoComplete='off'>
              <FormControl sx={{ width: '45ch' }}>
                <OutlinedInput
                  type='number'
                  value={newTopic.replicationFactor}
                  onChange={e => handleInputChange(e, 'replicationFactor')}
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
