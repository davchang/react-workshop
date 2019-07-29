import React, { useRef } from 'react';
import Select, { Option } from 'rc-select';
// import '../assets/index.less';
import './styles.scss'

function useRCSelect(name, value, options, onChangeCB) {
  const myRef = useRef(null)

  function handleChange(selectedValue) {
    onChangeCB(name, selectedValue)
    console.log('--handleChange--', selectedValue)
  }

  function handleBlur(selectedValue) {
    handleChange(selectedValue)
    console.log('--handleBlur--', selectedValue)

    myRef.current.inputRef.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.remove('-focused')
  }

  function handleFocus() {
    console.log('--handleFocus--')

    myRef.current.inputRef.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add('-focused')
  }

  return {
    ref: myRef,
    value: value,
    options: options,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus
  }
}

const RCSelect = React.forwardRef((props, ref) => {
  return (
    <Select ref={ref} {...props}>
      {
        props.options.map(item => (
          <Option key={item.value} value={item.value}>{item.label}</Option>
        ))
      }
    </Select>
  )
})

export default function HelloWorld() {

  const loadType = 'earthquake'

  const loadTypeData = {
    options: [
      {value: 'wind', label: 'Wind'},
      {value: 'earthquake', label: 'Earthquake'},
      {value: 'other', label: 'Other'}
    ]
  }

  function onChangeCB() {
    console.log('--onChangeCB called--')
  }

  const loadTypeObj = useRCSelect('loadType', loadType, loadTypeData.options, onChangeCB)

  return (
    <div>
      <RCSelect {...loadTypeObj} />
    </div>
  )
}
