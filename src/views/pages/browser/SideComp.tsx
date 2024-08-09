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
import React, { Dispatch, SetStateAction, useState } from 'react'
import TopButtons from './TopButtons'
import { Browser } from 'src/context/BrowserContext'
import { GridRowId } from '@mui/x-data-grid'
import { auto } from '@popperjs/core'

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  return (
    <div>
      <Popper
        sx={{ zIndex: 1200, marginTop: 3, marginLeft: 3 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ height: auto, width: 400, paddingLeft: 3, paddingBottom: 10 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <TopButtons
                  topicName={topicName}
                  currentTopics={currentTopics}
                  idArr={idArr}
                  setShowSide={setShowSide}
                />
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
