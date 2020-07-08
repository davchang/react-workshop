
import React, { useState, useReducer, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Provider, useSelector, useDispatch } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { settingsReducer, calculationReducer, statusReducer, feedbackReducer, commonReducer } from './exerciseReducers'
import InputSection from './InputSection'

import axios from 'axios'

// const postRequest = async (url, payload, options) => {
//   return await axios.post(url, payload, options)
// }

const options = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }
}

// const doCalculation = async (dispatch) => {
//   return function action(dispatch) {
//     const url = 'http://localhost:8765/pfd/calculations/testAPI'
//     const requestPayload = {testPayload: 'hello'}
//     const commonData = {testCommon: 'commonData'}
//     let resp = {}
//
//     dispatch({ type: 'CALCULATION_INIT', payload: commonData })
//
//     try {
//       const result = await postRequest(url, requestPayload, options)
//       dispatch({ type: 'CALCULATION_SUCCESS', payload: result.data })
//     } catch (error) {
//       dispatch({ type: 'CALCULATION_FAILURE', payload: { message: error } })
//     }
//   }
// }

export const doCalculation = () => {
  return function action(dispatch) {
    const url = 'http://localhost:8765/pfd/calculations/testAPI'
    const requestPayload = {testPayload: 'hello'}
    const commonData = {testCommon: 'commonData'}
    let resp = {}

    dispatch({ type: 'CALCULATION_INIT', payload: commonData })

    return axios.post(url, requestPayload, options).then (
      response => dispatch({ type: 'CALCULATION_SUCCESS', payload: response.data }),
      error => dispatch({ type: 'CALCULATION_FAILURE', payload: { message: error } })
    )
  }
}


function TopNav(props) {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.calculation.status)

  useEffect(() => {
    if (status.updatedCounter > 0) {
      dispatch(doCalculation())
    }
  }, [status.updatedCounter])

  return (
    <>
      <div className='b'>TopNav</div>
    </>
  )
}


function Page(props) {
  return (
    <>
      <TopNav />
      <br/><br/>
      <InputSection />
    </>
  )
}

function App(props) {
  const initialState = {
    settings: {
      orientation: 'vertical',
      fontSize: '-densityDefault',
      mediaClass: '-media-md',
      theme: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? '-themeDark' : '-themeLight',
      ioToggle: true,
      mobileNav: false
    },
    calculation: {
      input: {
        upliftLoadASD: '1720',
        loadType: 'wind',
        validation: {
          upliftLoadASD: ''
        }
      },
      status: {
        updatedCounter: 0,
        isLoading: false,
        isError: false
      },
      output: {
      }
    },
    status: {
      msgLevel: '',
      msgIconUrl: '',
      msgHeader: '',
      msgBody: '',
      noticeLevel: '',
      noticeIconUrl: '',
      noticeHeader: '',
      noticeBody: '',
      // upliftLoadASD: '',
      // email: 'This field is required.',
      // summary: 'This field is required.',
      // description: 'This field is required.',
      // attachments: '',
      // recipients: 'This field is required.',
      // updatedCounter: 0,
      // isLoading: false,
      // isError: false
    }
    // ,
    // feedback: {
    //   email: '',
    //   summary: '',
    //   description: '',
    //   attachments: [],
    //   showRecipients: false,
    //   validation: {
    //     email: 'This field is required.',
    //     summary: 'This field is required.',
    //     description: 'This field is required.'
    //   }
    // }
  }

  // const rootReducer = combineReducers({
  //   calculation: calculationReducer,
  //   settings: settingsReducer,
  //   status: statusReducer,
  //   feedback: feedbackReducer
  // });

  const appReducer = combineReducers({
    calculation: calculationReducer,
    settings: settingsReducer,
    status: statusReducer,
    feedback: feedbackReducer
  });

  const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === 'UPLOAD') {
      console.log('--foo--')
      state.status = Object.assign({}, action.payload.status)
      state.calculation = Object.assign({}, action.payload.calculation)
    } else if (action.type === 'USER_LOGGED_OUT') {
      state = undefined
    }

    return appReducer(state, action);
  };

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
    //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  return (
    <Provider store={store}>
      <div>
        <Page />
      </div>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));
