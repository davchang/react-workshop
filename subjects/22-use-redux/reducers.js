import React from 'react'

export const projectInfoReducer = (state=[], action) => {
  switch (action.type) {
    case 'PROJECT_INFO': {
      console.log('--99--', action)
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

export const staticDataReducer = (state=[], action) => {
  switch (action.type) {
    case 'STATIC_DATA_INIT': {
      console.log('--1--', state)
      return {
        ...state
      }
    }
    case 'STATIC_DATA_SUCCESS': {
      console.log('--2--', action)
      return {
        ...state,
        ...action.payload
      }
    }
    case 'STATIC_DATA_FAILURE': {
      console.log('--3--', action)
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

export const calculationReducer = (state=[], action) => {
  switch (action.type) {
    case 'FIELD_UPDATE': {
      console.log('--88--', action)
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

export const settingsReducer = (state=[], action) => {
  switch (action.type) {
    case 'FIELD_INPUT_UPDATE': {
      console.log('--99--', action)

      // state.input = Object.assign({}, state.input, action.payload)
      // return Object.assign({}, state)

      // return {
      //   ...state,
      //   ...state.input
      // }

      return {
        ...state,
        ...action.payload
      }

    }
    default:
      return state
  }
}
