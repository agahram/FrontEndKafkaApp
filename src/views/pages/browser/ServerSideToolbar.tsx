// ** React Imports
import { ChangeEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { GridToolbarExport } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Button, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'

interface Props {
  value: string
  clearSearch: () => void
  onChange: (e: ChangeEvent) => void
}

const ServerSideToolbar = (props: Props) => {
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setSearchValue(event.target.value)
  }

  const handleSelectSearch = (value: string) => {
    console.log(value)
  }

  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'start',
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      <TextField
        size='small'
        value={props.value}
        onChange={props.onChange}
        placeholder='Search'
        InputProps={{
          startAdornment: (
            <Box sx={{ mr: 2, display: 'flex' }}>
              <Icon icon='mdi:magnify' fontSize={20} />
            </Box>
          ),
          endAdornment: (
            <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
              <Icon icon='mdi:close' fontSize={20} />
            </IconButton>
          )
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto'
          },
          '& .MuiInputBase-root > svg': {
            mr: 2
          }
        }}
      />
      {/* <FormControl> */}
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={searchValue}
        label=''
        onChange={handleChange}
        sx={{ height: 40 }}
      >
        <MenuItem value='key'>key</MenuItem>
        <MenuItem value='header'>header</MenuItem>
        <MenuItem value='timestamp'>timestamp</MenuItem>
        <MenuItem value='partition'>partition</MenuItem>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='contained' sx={{ width: 130 }} onClick={() => handleSelectSearch(searchValue)}>
            Select
          </Button>
        </Box>
      </Select>
      {/* </FormControl> */}
    </Box>
  )
}

export default ServerSideToolbar
