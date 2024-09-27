import axios from 'axios'
import apiClient from '../api-clients/api-clients'
export const API_REQUEST = 'API_REQUEST'
export const API_SUCCESS = 'API_SUCCESS'
export const API_FAILURE = 'API_FAILURE'

// src/features/apiActions.js

// Action creators
export const apiRequest = (source) => ({
  type: API_REQUEST,
  payload: { source }
})

export const apiSuccess = (data, source) => ({
  type: API_SUCCESS,
  payload: { data, source }
})

export const apiFailure = (error, source) => ({
  type: API_FAILURE,
  payload: { error, source }
})

// Thunk action for making an API call
export const queryData = (source, endpoint, method, payload = null, params = {}) => {
  return async (dispatch) => {
    dispatch(apiRequest(source))
    try {
      let response
      switch (method) {
        case 'GET':
          response = await apiClient.get(endpoint, { params })
          break
        case 'POST':
          response = await apiClient.post(endpoint, payload, { params })
          break
        case 'PUT':
          response = await apiClient.put(endpoint, payload, { params })
          break
        case 'DELETE':
          response = await apiClient.delete(endpoint, { params })
          break
        default:
          throw new Error('Unsupported method')
      }
      dispatch(apiSuccess(response.data, source))
    } catch (error) {
      dispatch(apiFailure(error.message, source))
    }
  }
}
