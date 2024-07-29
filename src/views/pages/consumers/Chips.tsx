import { ChipPropsColorOverrides } from '@mui/material'
import React from 'react'
import CustomChip from 'src/@core/components/mui/chip'

interface Props {
  label: string
}

export default function Chips({ label }: Props) {
  if (label === 'stable') {
    return <CustomChip label='stable' skin='light' color='success' />
  } else if (label === 'empty') {
    return <CustomChip label='empty' skin='light' color='warning' />
  } else if (label === 'rebalancing') {
    return <CustomChip label='rebalancing' skin='light' color='primary' />
  } else if (label === 'dead') {
    return <CustomChip label='dead' skin='light' color='error' />
  }
}
