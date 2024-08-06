import React from 'react'

function TextWithLineBreaks(props: { text: string }) {
  const textWithBreaks = props.text.split('\n').map((text, index) => (
    <React.Fragment key={index}>
      <br />
      {text}
      <br />
    </React.Fragment>
  ))

  return <div>{textWithBreaks}</div>
}

export default TextWithLineBreaks
