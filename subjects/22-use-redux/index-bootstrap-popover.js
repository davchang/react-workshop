import React from 'react'
import { OverlayTrigger, Popover, Button} from 'react-bootstrap'
import './styles.scss'

export default function HelloWorld() {
  const popover = (
    <Popover title="Popover right">
      And here's some <strong>amazing</strong> content. It's very engaging. right?
    </Popover>
  );

  const MyPopover = () => {
    return (
      <OverlayTrigger
        trigger="click"
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={popover}>
        <Button variant="success">Click me to see popover</Button>
      </OverlayTrigger>
    )
  }

  function InputBlock(props) {
    return (
      <div className="inputBlock">
        <label className="label">{props.label}&nbsp;&nbsp;</label>
        <MyPopover />
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
