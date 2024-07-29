import * as React from 'react'
import Box from '@mui/material/Box'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import ConfigButton from './ConfigButton'
import Divider from '@mui/material/Divider'
import { useConnection } from 'src/context/ConnectionsContext'
import { ClickAwayListener } from '@mui/base'

interface Props {
  id: number
  details: string
  name: string
}

export default function PositionedPopper({ id, details, name }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState(false)
  const [placement, setPlacement] = React.useState<PopperPlacementType>()
  const { deleteConnection, addConnections } = useConnection()

  const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen(prev => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }

  function handleDelete() {
    deleteConnection(id)
  }

  function handleDuplicate() {
    addConnections({
      connectionName: name,
      bootStrapServer: details
    })
  }

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box sx={{ width: 300 }}>
        <Popper
          // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
          sx={{ zIndex: 1200 }}
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography sx={{ p: 1 }}>
                  <Stack spacing={0.1}>
                    <Stack sx={{ marginBottom: -2 }}>
                      <ConfigButton details={details} name={name} id={id} />
                    </Stack>
                    <Divider />
                    <Stack sx={{ marginBottom: -10, marginTop: -10 }}>
                      <Button
                        variant='text'
                        sx={{ mr: 2, fontWeight: 401, fontSize: 13 }}
                        onClick={() => handleDuplicate()}
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
                    </Stack>
                    <Divider />
                    <Stack sx={{ marginBottom: -2, marginTop: -2 }}>
                      <Button
                        variant='text'
                        sx={{ mr: 2, fontWeight: 401, fontSize: 13 }}
                        onClick={() => handleDelete()}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' height='3em' viewBox='0 0 24 24'>
                          <path
                            fill='currentColor'
                            d='M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z'
                          ></path>
                        </svg>
                        Delete
                      </Button>
                    </Stack>
                  </Stack>
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
        <Grid container justifyContent='flex-start'>
          <Grid item container alignItems='flex-end' direction='column'>
            <Grid item>
              <Button onClick={handleClick('right-end')} sx={{ fontWeight: 1000 }}>
                ...
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ClickAwayListener>
  )
}
