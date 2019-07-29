import React, { useRef } from 'react';
import DropdownSelect from 'react-dropdown-select';
import './styles.scss'
// import { useDropdown } from '../../utils/useForm'
import FormGroup from '../../lib/formGroup'

function Dropdown(props) {
  const { name, value, options, onChangeCB } = props
  const myRef = useRef(null)

  let selectedOption = null
  if (value && options.length > 0) {
    selectedOption = options.find((x) => {return x.value === value})
  } else {
     selectedOption = options[0]
  }

  function handleChange(option) {
    // console.log("--option--", option)
    console.log("--option--", option[0].value)
    onChangeCB(name, option[0].value)
  }

  function handleDropdownOpen() {
    console.log('--handleDropdownOpen')
    myRef.current.getSelectRef().parentNode.parentNode.classList.add('-focused')
  }

  function handleDropdownClose() {
    console.log('--handleDropdownClose')
    myRef.current.getSelectRef().parentNode.parentNode.classList.remove('-focused')
  }

  return (
    <DropdownSelect
      ref={myRef}
      options={options}
      values={[selectedOption]}
      onChange={handleChange}
      onDropdownOpen={handleDropdownOpen}
      onDropdownClose={handleDropdownClose}>
      {props.children}
    </DropdownSelect>
  )
}

// const DropdownSelect = React.forwardRef((props, ref) => {
//
//   function handleChange(selectedOptions) {
//     onChangeCB(name, selectedOptions[0].value)
//   }
//
//   function handleDropdownOpen() {
//     console.log('--handleDropdownOpen')
//     ref.current.classList.add('-focused')
//   }
//
//   function handleDropdownClose() {
//     console.log('--handleDropdownClose')
//     ref.current.classList.remove('-focused')
//   }
//
//   return (
//     <Select
//       options={options}
//       values={[values]}
//       onChange={handleChange}
//       onDropdownOpen={handleDropdownOpen}
//       onDropdownClose={handleDropdownClose}>
//       {props.children}
//     </Select>
//   )
// }

export default function HelloWorld() {
  const loadTypeRef = useRef(null)

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

  const loadType = 'earthquake'
  // const loadTypeObj = useDropdown('loadType', loadType, loadTypeData.options, onChangeCB, loadTypeRef)

  return (
    <FormGroup className='col' label='Load Type'>
      <Dropdown name='loadType' value={loadType} options={loadTypeData.options} onChangeCB={onChangeCB} />
    </FormGroup>
  )
}
