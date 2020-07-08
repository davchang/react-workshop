
import React, { useState, useReducer, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { useSelector, useDispatch } from 'react-redux'
import DropdownSelect from 'react-dropdown-select'

import { useInput, useDropdown, FormGroup } from './useForm'

const loadTypeInitData = {
  options: [
    {value: 'wind', label: 'Wind'},
    {value: 'earthquake', label: 'Earthquake'},
    {value: 'other', label: 'Other'}
  ]
}

export default function InputSection(props) {
  const dispatch = useDispatch()
  const myState = useSelector((state) => state)

  const { loadType, upliftLoadASD, validation } = myState.calculation.input
  const { updatedCounter } = myState.calculation.status

  const upliftLoadRef = useRef(null)
  const upliftLoadObj = useInput('upliftLoadASD', upliftLoadASD, onChangeInputCB, validation.upliftLoadASD, ['isEmpty', 'validUpliftLoadASD'], upliftLoadRef)

  const loadTypeRef = useRef(null)
  console.log('--loadTypeInitData--', loadTypeInitData)
  const loadTypeObj = useDropdown('loadType', loadType, loadTypeInitData.options, onChangeCB, loadTypeRef)

  function onChangeCB(name, value) {
    dispatch({ type: 'FIELD_UPDATE', payload: {[name]: value} })
  }

  function onChangeInputCB(name, value, error) {
    const myPayload = [].concat({[name]: value}).concat({[name]: error})
    dispatch({ type: 'FIELD_INPUT_UPDATE', payload: myPayload })

    if (!error) {
      dispatch({ type: 'FIELD_INPUT_STATUS', payload: { updatedCounter: updatedCounter+1 } })
    }
  }

  return (
    <>
      <div className='b'>
        state: {JSON.stringify(myState, null)}
      </div>

      <br/>

      <FormGroup ref={upliftLoadRef} label='Uplift Load'>
        <div className="inputGroup">
          <input type="text" {...upliftLoadObj}/>
          {upliftLoadObj.error ?
            <label className='input-error is-visible'>{upliftLoadObj.error}</label> : null
          }
        </div>
      </FormGroup>

      <br/>

      <FormGroup ref={loadTypeRef} label='Load Type'>
      { (loadTypeInitData.options && loadTypeInitData.options.length > 0) ?
        <DropdownSelect {...loadTypeObj} />
        : <div>...</div>
      }
      </FormGroup>

    </>
  )
}
