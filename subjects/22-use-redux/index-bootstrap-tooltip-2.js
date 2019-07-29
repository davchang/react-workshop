import React from 'react'
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap'
import InputBlock from '../../lib/inputBlock'
import './styles.scss'

export default function HelloWorld() {

  const MyToolTip = () => {
    return (
      <OverlayTrigger
        placement={'right'}
        overlay={
          <Tooltip>
            my Tooltip ...
          </Tooltip>
        }
      >
        <Button variant="secondary">Hover me to see Tooltip on right</Button>
      </OverlayTrigger>
    )
  }

  // function InputBlock(props) {
  //   return (
  //     <div className="inputBlock">
  //       <label className="label">{props.label}&nbsp;&nbsp;</label>
  //       <MyToolTip />
  //       <br/>
  //       {props.children}
  //     </div>
  //   )
  // }

  return (
    <div className='foo'>
      <InputBlock label='Uplift Load'>
        <input value='default input value'/>
      </InputBlock>
    </div>
  )
}
