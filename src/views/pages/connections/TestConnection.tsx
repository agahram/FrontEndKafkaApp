import Button from '@mui/material/Button'
import React, { useState } from 'react'

export default function TestConnection() {
  const [show, setShow] = useState<boolean>(false)

  function handleTestConnection() {}
  return (
    <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleTestConnection()}>
      Test connection
    </Button>
  )
}
