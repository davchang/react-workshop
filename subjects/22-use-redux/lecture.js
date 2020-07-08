
import React, { useState, useReducer, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import DropdownSelect from 'react-dropdown-select'
import axios from 'axios'
import { projectInfoReducer, staticDataReducer, calculationReducer, settingsReducer } from './reducers'
import { fetchStaticData, fetchStaticDataSuccess, fetchStaticDataError } from './actions'

import staticData from './staticData.json'

console.log(staticData)
console.log(staticData.geometrySubTypeData.optionsCMU[0])
console.log(staticData.geometrySubTypeData.optionsCastInPlace[2])

const projectInfo = {
  projectName: 'Hello',
  aFunctionCall: () => {
    console.log('--called--')
    return 'Hello Redux'
  }
}

const initialState = {

  staticData: {
    loadTypeInitData: {
      options: []
    }
  },
  calculation: {
    // loadType: 'earthquake'
  },
  settings: {
    upliftLoad: 1234
  }
  // upliftLoad: '4300',
  // loadType: 'wind'

}

const rootReducer = combineReducers({
  projectInfo: projectInfoReducer,
  staticData: staticDataReducer,
  calculation: calculationReducer,
  settings: settingsReducer
});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


// const loadTypeInitData = {
//   options: [
//     {value: 'wind', label: 'Wind'},
//     {value: 'earthquake', label: 'Earthquake'},
//     {value: 'other', label: 'Other'}
//   ]
// }

const FormGroup = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="formGroup">
      <label className="formGroup__title">{props.label}{/*<MyPopover />   {/* switch with MyToolTip/MyPopover to test */}</label>
      {props.children}
    </div>
  )
})

function useInput(name, value, onChangeCB, ref) {
  // const myRef = useRef(null)
  let errors = []
  let validationMsg = null

  function handleChange(e) {
    e.preventDefault()
    e.stopPropagation()
    onChangeCB(name, e.target.value)
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

function useDropdown(name, value, options, onChangeCB, ref) {
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

function InputSection(props) {
  const myState = useSelector((state) => state)
  console.log('--state--', myState)
  const { loadTypeInitData, wallThicknessData } = myState.staticData
  const { projectName, aFunctionCall } = myState.projectInfo

  console.log(projectName, aFunctionCall)
  console.log(aFunctionCall())

  const { loadType } = myState.calculation
  const { upliftLoad } = myState.settings
  // console.log(loadType, upliftLoad)

  const dispatch = useDispatch()

  const upliftLoadRef = useRef(null)
  const upliftLoadObj = useInput('upliftLoad', upliftLoad, onChangeInputCB, null, upliftLoadRef)

  const loadTypeRef = useRef(null)
  console.log('--loadTypeInitData--', loadTypeInitData)
  const loadTypeObj = useDropdown('loadType', loadType, loadTypeInitData.options, onChangeCB, loadTypeRef)

  function onChangeCB(name, value) {
    dispatch({type: 'FIELD_UPDATE', payload: {[name]: value}})
  }

  function onChangeInputCB(name, value) {
    dispatch({type: 'FIELD_INPUT_UPDATE', payload: {[name]: value}})
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

function Page(props) {

  const dispatch = useDispatch()

  // for projectInfo
  dispatch({ type: 'PROJECT_INFO', payload: projectInfo })

  // axios.get the staticData
  dispatch(fetchStaticData());

  return (
    <>
      <InputSection />
    </>
  )
}

function App(props) {

  return (
    <Provider store={store}>
      <div>
        <Page />
      </div>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
