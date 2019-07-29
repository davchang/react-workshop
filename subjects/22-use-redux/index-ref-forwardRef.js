import React, { useState, useReducer, useRef, useEffect } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { createStore } from 'redux'
import { useInput, useDropdown } from '../../utils/useForm'
import DropdownSelect from 'react-dropdown-select'
import FormGroup from '../../lib/FormGroup'


const initialState = {
  upliftLoad: '4300',
  loadType: 'wind'
}

function myReducer(state, action) {
  switch (action.type) {
    case 'FIELD_UPDATE': {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

const store = createStore(
  myReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const loadTypeInitData = {
  options: [
    {value: 'wind', label: 'Wind'},
    {value: 'earthquake', label: 'Earthquake'},
    {value: 'other', label: 'Other'}
  ]
}

// function useInput(name, value, onChangeCB, ref) {
//   // const myRef = useRef(null)
//   let errors = []
//   let validationMsg = null
//
//   function handleChange(e) {
//     e.preventDefault()
//     e.stopPropagation()
//     onChangeCB(name, e.target.value)
//   }
//
//   function handleBlur(e) {
//     e.preventDefault()
//     e.stopPropagation()
//     handleChange(e)
//
//     ref.current.classList.remove('-focused')
//   }
//
//   function handleFocus(e) {
//     e.preventDefault()
//     e.stopPropagation()
//
//     ref.current.classList.add('-focused')
//   }
//
//   return {
//     ref: ref,
//     value: value,
//     onChange: handleChange,
//     onBlur: handleBlur,
//     onFocus: handleFocus,
//     error: status
//   }
// }
//
// function useDropdown(name, value, options, onChangeCB, ref) {
//   let selectedOption = null
//   if (value && options.length > 0) {
//     selectedOption = options.find((x) => {return x.value === value})
//   } else {
//      selectedOption = options[0]
//   }
//
//   function handleChange(selectedOptions) {
//     if (value !== selectedOptions[0].value) {
//       onChangeCB(name, selectedOptions[0].value)
//     }
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
//   return {
//     ref: ref,
//     options: options,
//     values: [selectedOption],
//     onChange: handleChange,
//     onDropdownOpen: handleDropdownOpen,
//     onDropdownClose: handleDropdownClose
//   }
// }

function InputArea(props) {
  const myState = useSelector((state) => state)
  const { upliftLoad, loadType } = myState
  const dispatch = useDispatch()

  const upliftLoadRef = useRef(null)
  const upliftLoadObj = useInput('upliftLoad', upliftLoad, onChangeCB, null, upliftLoadRef)

  const loadTypeRef = useRef(null)
  const loadTypeObj = useDropdown('loadType', loadType, loadTypeInitData.options, onChangeCB, loadTypeRef)


  // useEffect(() => {
  //   upliftLoadRef.current.focus()
  // }, {})

  function onChangeCB(name, value) {
    dispatch({type: 'FIELD_UPDATE', payload: {[name]: value}})
  }

  function handleClick(e) {
    console.log('--clicked me--')
    // setLastName('foo')
    dispatch({type: 'FIELD_UPDATE', payload: {lastName: 'earthquake'}})
  }

  return (
    <>
      <div className='b'>
        state: {JSON.stringify(myState, null)}
      </div>

      <br/><br/>
      <FormGroup ref={upliftLoadRef} label='Uplift Load'>
        <div className="inputGroup">
          <input type="text" {...upliftLoadObj}/>
        </div>
      </FormGroup>

      <br/><br/>

      <FormGroup ref={loadTypeRef} label='Load Type'>
        <DropdownSelect {...loadTypeObj} />
      </FormGroup>


    </>
  )
}

export default function HelloWorld() {
  return (
    <Provider store={store}>
      <div>
        <InputArea/>
      </div>
    </Provider>
  )
}
