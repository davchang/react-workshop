import React, { useRef } from 'react'
import FormGroup from '../../lib/FormGroup'
import './styles.scss'

const FancyButton = React.forwardRef((props, ref) => {
  function handleClick() {
    console.log('--handleClick--')
    ref.current.classList.add('-focused')
  }

  function handleBlur() {
    console.log('--handleBlur--')
    ref.current.classList.remove('-focused')
  }

  return (
    <button className="FancyButton" onBlur={handleBlur} onFocus={handleClick}>
      {props.children}
    </button>
  )
})

// const FormGroup = React.forwardRef((props, ref) => {
//   return (
//     <div ref={ref} className="formGroup">
//       <label className="formGroup__title">{props.label}{/*<MyPopover />   {/* switch with MyToolTip/MyPopover to test */}</label>
//       {props.children}
//     </div>
//   )
// })


export default function HelloWorld() {
  // You can now get a ref directly to the DOM button:
  const refA = React.createRef();
  const refB = React.createRef();



  return (
    <>
      <FormGroup ref={refA} label="Button A" popoverText={"xxxxxxxxx"}>
        <div>
          <div>
            <div>
              <div>
                <FancyButton ref={refA} >ButtonA Click me!</FancyButton>
              </div>
            </div>
          </div>
        </div>
      </FormGroup>


      <FormGroup ref={refB} label="Button B" popoverText={"yyyyyyyyyyyy"}>
        <div>
          <div>
            <FancyButton ref={refB} >ButtonB Click me!</FancyButton>
          </div>
        </div>
      </FormGroup>
    </>
  )
}
