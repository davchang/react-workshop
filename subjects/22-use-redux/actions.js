import React from 'react'
import axios from 'axios'

export const fetchStaticData = () => {
  return function action(dispatch) {
    dispatch({ type: 'STATIC_DATA_INIT' })

    const request = axios({
      method: 'GET',
      url: 'http://localhost:8765/fetchInitData',
      headers: []
    });

    return request.then(
      response => dispatch(fetchStaticDataSuccess(response.data)),
      err => dispatch(fetchStaticDataError(err))
    );
  }
}

export const fetchStaticDataSuccess = (data) => {
	return {
		type: 'STATIC_DATA_SUCCESS',
		payload: data
	};
}

export const fetchStaticDataError = (error) => {
	return {
		type: 'STATIC_DATA_FAILURE',
		payload: error
	};
}
