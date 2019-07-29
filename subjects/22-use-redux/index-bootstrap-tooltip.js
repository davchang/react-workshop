import React from 'react'
import { OverlayTrigger, Button } from 'react-bootstrap'
import InputBlock from '../../lib/inputBlock'

import './styles.scss'

export default function HelloWorld() {

  const renderTooltip = props => (
    <div
      {...props}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: '2px 10px',
        color: 'white',
        borderRadius: 3,
        ...props.style,
      }}
    >
      Simple tooltip
    </div>
  );

  const Example = () => {
    return (
      <OverlayTrigger
        placement="right-start"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button variant="success">Info? hover me..</Button>
      </OverlayTrigger>
    )
  }

  function InputBlock(props) {
    return (
      <div className="inputBlock">
        <label className="label">{props.label}&nbsp;&nbsp;</label>
        <Example />
        <br/>
        {props.children}
      </div>
    )
  }

  return (
    <div className='foo'>
      <InputBlock label='Uplift Load'>
        <input value='default input value'/>
      </InputBlock>
    </div>
  )
}
