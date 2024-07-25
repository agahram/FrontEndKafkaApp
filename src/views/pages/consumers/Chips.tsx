import { ChipPropsColorOverrides } from '@mui/material'
import React from 'react'
import CustomChip from 'src/@core/components/mui/chip'

interface Props {
  label: string
}

export default function Chips({ label }: Props) {
  let color = ''
  if (label === 'stable') {
    color = 'success'
  } else if (label === 'empty') {
    color = 'warning'
  } else if (label === 'rebalancing') {
    color = 'primary'
  } else if (label === 'dead') {
    color = 'error'
  }
  return <CustomChip label={label} skin='light' color={color} />
}
