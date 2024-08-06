import { Box, Card, CardContent, Fade, Paper, Popper, PopperPlacementType, Stack, Typography } from '@mui/material'
import React from 'react'
import TopButtons from './TopButtons'
import { Browser } from 'src/context/BrowserContext'

interface Props {
  open: boolean
  placement: any
  topicName: string
  currentTopics: Browser[]
  idArr: string[]
}

export default function SideComp({ open, placement, topicName, currentTopics, idArr }: Props) {
  return (
    <div>
      <Popper
        sx={{ zIndex: 1500 }}
        open={open}
        //   anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ height: 700, width: 400, paddingLeft: 3 }}>
              <br />
              <TopButtons topicName={topicName} currentTopics={currentTopics} idArr={idArr} />
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  )
}
