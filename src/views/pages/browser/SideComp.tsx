import {
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  Paper,
  Popper,
  PopperPlacementType,
  Stack,
  Typography
} from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import TopButtons from './TopButtons'
import { Browser } from 'src/context/BrowserContext'
import { GridRowId } from '@mui/x-data-grid'

interface Props {
  open: boolean
  placement: any
  topicName: string
  currentTopics: Browser[]
  idArr: string[]
  setShowSide: Dispatch<SetStateAction<boolean>>
  setSelectionModel: Dispatch<SetStateAction<GridRowId[]>>
}

export default function SideComp({
  open,
  placement,
  topicName,
  currentTopics,
  idArr,
  setShowSide,
  setSelectionModel
}: Props) {
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <TopButtons topicName={topicName} currentTopics={currentTopics} idArr={idArr} />
                <Button
                  sx={{ fontSize: 20 }}
                  onClick={() => {
                    setShowSide(false), setSelectionModel([])
                  }}
                >
                  X
                </Button>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  )
}
