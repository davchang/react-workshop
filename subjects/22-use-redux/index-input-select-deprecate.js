import React from 'react'
import { useState, useReducer, useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { createStore } from 'redux'
import { useInput, useActionButton, useLogicButton, useTextButton,
         useSelect } from '../../utils/useForm'
import Select from 'react-select'

// import Message from '../../components/message'

// export default function HelloWorld() {
//   return (
//     <div className='helloWorld'>
//       <div className='helvetica-9'>Hello World! This should be heavy as it's done in Helvetica-9 Heavy!</div>
//
//       <p>test</p>
//
//       <img src='src/globals/images/technical-difficulties.svg' />
//     </div>
//   )
// }

const initialState = {
  lastName: 'David',
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
    {value: 'earthquake', label: 'Earthquake'}
  ]
}

function InputArea(props) {
  const myState = useSelector((state) => state)
  const { lastName, loadType } = myState
  console.log('--lastName--', lastName)
  const dispatch = useDispatch()
  const lastNameObj = useInput('lastName', lastName, onChangeCB)
  const loadTypeObj = useSelect('loadType', loadType, loadTypeInitData.options, onChangeCB)


  useEffect(() => {
    lastNameObj.ref.current.focus()
  }, {})

  function onChangeCB(name, value) {
    dispatch({type: 'FIELD_UPDATE', payload: {[name]: value}})
  }

  function handleClick(e) {
    console.log('--clicked me--')
    // setLastName('foo')
    dispatch({type: 'FIELD_UPDATE', payload: {lastName: 'earthquake'}})
  }

  function Button({ onClick, children }) {
    return (
      <button onClick={onClick} type='button'>
          {children}
      </button>
    )
  }

  // function Input({ value, onChange, children }) {
  //   return (
  //     <input value={value} onChange={handleChange} type='text'>
  //         {children}
  //     </input>
  //   )
  // }
  // function useMyInput(name, value, onChangeC) {
  //   const myRef = useRef(null)
  //
  //   function handleChange(e) {
  //     e.preventDefault()
  //     onChangeCB(name, e.target.value)
  //   }
  //
  //   function handleBlur(e) {
  //     e.preventDefault()
  //     onChangeCB(name, e.target.value)
  //   }
  //
  //   return {
  //     ref: myRef,
  //     value: value,
  //     onChange: handleChange,
  //     onBlur: handleBlur
  //   }
  // }


  return (
    <>
      <div className='b'>
        state: {JSON.stringify(myState, null)}
      </div>

      <br/><br/>
      <label htmlFor=''>Load Type</label>
      <Select {...loadTypeObj}>
      </Select>

      <br/><br/>

      <label>last name</label>
      <input {...lastNameObj}>
      </input>

      <br/><br/>

      <Button onClick={handleClick}>Foo</Button>
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
