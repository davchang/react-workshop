import React from 'react'

export const projectInfoReducer = (state=[], action) => {
  console.log('--projectInfoReducer--', state)
  switch (action.type) {
    case 'PROJECT_INFO': {
      return Object.assign({}, state, action.payload)
    }
    default:
      return state
  }
}

export const staticDataReducer = (state=[], action) => {
  console.log('--staticDataReducer--', state)
  switch (action.type) {
    case 'STATIC_DATA_INIT': {
      return Object.assign({}, state, action.payload)
    }
    case 'STATIC_DATA_SUCCESS': {
      return Object.assign({}, state, action.payload)
    }
    case 'STATIC_DATA_FAILURE': {
      return Object.assign({}, state, action.payload)
    }
    default:
      return state
  }
}

export const calculationReducer = (state=[], action) => {
  console.log('--calculationReducer--', state)
  switch (action.type) {
    case 'FIELD_INPUT_UPDATE': {
      const myPayload = action.payload
      state.input.validation = Object.assign({}, state.input.validation, myPayload[1])
      state.input = Object.assign({}, state.input, myPayload[0])
      return Object.assign({}, state)
    }
    case 'FIELD_UPDATE': {
      state.input = Object.assign({}, state.input, action.payload)
      return Object.assign({}, state)
    }
    case 'FIELD_INPUT_STATUS': {
      state.status = Object.assign({}, state.status, action.payload)
      return Object.assign({}, state)
    }
    case 'CALCULATION_INIT': {
      state.status = Object.assign({}, state.status, { isLoading: true, isError: false })
      state.commonData = action.payload
      return Object.assign({}, state)
    }
    case 'CALCULATION_SUCCESS': {
      state.status = Object.assign({}, state.status, { isLoading: false, isError: false })
      state.output = action.payload
      return Object.assign({}, state)
    }
    case 'CALCULATION_FAILURE': {
      state.output = action.payload
      state.status = Object.assign({}, state.status, { isLoading: false, isError: true })
      return Object.assign({}, state)
    }
    default:
      return state
  }
}

export const statusReducer = (state=[], action) => {
  console.log('--statusReducer--', state)
  switch (action.type) {
    case 'FIELD_UPDATE': {
      return Object.assign({}, state, action.payload)
    }
    case 'CLEAR_NOTICE': {
      return Object.assign({}, state, {noticeLevel: '', noticeIconUrl: '', noticeHeader: '', noticeBody: ''})
    }
    case 'CLEAR_GLOBAL_MSG': {
      return Object.assign({}, state, {msgLevel: '', msgIconUrl: '', msgHeader: '', msgBody: ''})
    }
    default:
      return state
  }
}

export const settingsReducer = (state=[], action) => {
  console.log('--settingsReducer--', state)
  switch (action.type) {
    case 'FIELD_UPDATE': {
      return Object.assign({}, state, action.payload)
    }
    default:
      return state
  }
}

const INITIAL_FEEDBACK_STATE = {
  feedback: {
    email: '',
    summary: '',
    description: '',
    attachments: [],
    showRecipients: false,
    validation: {
      email: 'This field is required.',
      summary: 'This field is required.',
      description: 'This field is required.'
    }
  }
}

export const feedbackReducer = (state=INITIAL_FEEDBACK_STATE, action) => {
  console.log('--feedbackReducer--', state)
  switch (action.type) {
    case 'FIELD_UPDATE': {
      return Object.assign({}, state, action.payload)
    }
    case 'FIELD_INPUT_UPDATE': {
      const myPayload = action.payload
      state.validation = Object.assign({}, state.validation, myPayload[1])
      return Object.assign({}, state, myPayload[0])
    }
    default:
      return state
  }
}

export const commonReducer = (state=[], action) => {
  switch (action.type) {
    case 'UPLOAD': {
      state.status = Object.assign({}, action.payload.status)
      state.calculation = Object.assign({}, action.payload.calculation)
      return Object.assign({}, state)
    }
    case 'DOWNLOAD': {
      doDownload(state)
      return Object.assign({}, state)
    }
    default:
      return state
  }
}
