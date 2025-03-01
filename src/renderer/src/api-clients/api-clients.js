import axios from 'axios'
export const serverUrl = 'http://localhost:8080'
const apiClient = axios.create({
  baseURL: serverUrl
})
export default apiClient
