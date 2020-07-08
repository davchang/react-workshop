import React from 'react'
import validatorWrapper from './validatorWrapper'

export const FormGroup = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="formGroup">
      <label className="formGroup__title">{props.label}{/*<MyPopover />   {/* switch with MyToolTip/MyPopover to test */}</label>
      {props.children}
    </div>
  )
})

export function useInput(name, value, onChangeCB, status, validationMethods, ref) {
  // const myRef = useRef(null)
  let errors = []
  let validationMsg = null

  function handleChange(e) {
    e.preventDefault()
    e.stopPropagation()

    const myValue = e.target.value
    errors = validatorWrapper.validate(validationMethods, myValue)
    onChangeCB(name, myValue, errors[0] ? errors[0] : '')
    // onChangeCB(name, e.target.value)
  }

  function handleBlur(e) {
    e.preventDefault()
    e.stopPropagation()
    handleChange(e)

    // ref.current.classList.remove('-focused')
  }

  function handleFocus(e) {
    e.preventDefault()
    e.stopPropagation()

    // ref.current.classList.add('-focused')
  }

  return {
    ref: ref,
    value: value,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    error: status
  }
}

export function useDropdown(name, value, options, onChangeCB, ref) {
  let selectedOption = null
  if (value && options.length > 0) {
    selectedOption = options.find((x) => {return x.value === value})
  } else {
     selectedOption = options[0]
  }

  function handleChange(selectedOptions) {
    if (value !== selectedOptions[0].value) {
      onChangeCB(name, selectedOptions[0].value)
    }
  }

  function handleDropdownOpen() {
    console.log('--handleDropdownOpen')
    // ref.current.classList.add('-focused')
  }

  function handleDropdownClose() {
    console.log('--handleDropdownClose')
    // ref.current.classList.remove('-focused')
  }

  return {
    ref: ref,
    options: options,
    values: [selectedOption],
    onChange: handleChange,
    onDropdownOpen: handleDropdownOpen,
    onDropdownClose: handleDropdownClose
  }
}
