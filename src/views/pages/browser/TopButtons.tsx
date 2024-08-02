import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Divider } from '@mui/material'
import { Browser } from 'src/context/BrowserContext'
import { useState } from 'react'
import { idID } from '@mui/material/locale'
import { id } from 'date-fns/locale'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface Props {
  topicName: string
  currentTopics: Browser[]
  idArr: string[]
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function BasicTabs({ topicName, currentTopics, idArr }: Props) {
  const [value, setValue] = useState(0)
  let new_time = ''
  let new_partition = 0
  let new_offset = 0
  let new_key = ''
  let new_value = ''
  for (let i = 0; i < currentTopics.length; i++) {
    if (currentTopics[i].timestamp === idArr[0]) {
      new_time = currentTopics[i].timestamp
      new_partition = currentTopics[i].partitions
      new_offset = currentTopics[i].offset
      new_key = currentTopics[i].key
      new_value = currentTopics[i].value
      console.log('+++++++', new_partition)
    }
  }
  const escapedResponseJson = JSON.stringify(new_key).replace('"', '\n')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab
            label='Meta'
            {...a11yProps(0)}
            icon={
              <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'>
                <path
                  fill='currentColor'
                  d='M3 0h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm0 8h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z'
                ></path>
              </svg>
            }
          />
          <Tab
            label='Key'
            {...a11yProps(1)}
            icon={
              <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.738 5.1a3.38 3.38 0 0 1 2.7-1.35h7.124c1.063 0 2.063.5 2.7 1.35l2.588 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008zm0-6h.008v.008h-.008zm-3 6h.008v.008h-.008zm0-6h.008v.008h-.008z'
                ></path>
              </svg>
            }
          />
          <Tab
            label='Value'
            {...a11yProps(2)}
            icon={
              <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.738 5.1a3.38 3.38 0 0 1 2.7-1.35h7.124c1.063 0 2.063.5 2.7 1.35l2.588 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008zm0-6h.008v.008h-.008zm-3 6h.008v.008h-.008zm0-6h.008v.008h-.008z'
                ></path>
              </svg>
            }
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <h3>General</h3>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>Topic</h4>
          <h5>{topicName}</h5>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>Partition</h4>
          <h5>{new_partition}</h5>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>Offset</h4>
          <h5>{new_offset}</h5>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>Timestamp</h4>
          <h5>{new_time}</h5>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>Key</h4>
          <h5>{new_key}</h5>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>Value</h4>
          <h5>{new_value}</h5>
        </Box>
      </CustomTabPanel>
    </Box>
  )
}
