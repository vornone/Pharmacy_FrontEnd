import axios from 'axios'

/**
 * Creates an Axios instance with default configuration.
 * @param {string} token - The authorization token.
 * @returns {Object} - The Axios instance.
 */
function createAxiosInstance(token, isRequiredAuth) {
  if (isRequiredAuth) {
    return axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  } else {
    return axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

/**
 * Makes a GET request to the specified URL with the given token.
 * @param {string} url - The URL to send the GET request to.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} - The response data.
 */
function get(url, token, isRequiredAuth) {
  const axiosInstance = createAxiosInstance(token, isRequiredAuth)
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`Error making GET request to ${url}:`, error)
      throw error
    })
}

/**
 * Makes a POST request to the specified URL with the given data and token.
 * @param {string} url - The URL to send the POST request to.
 * @param {Object} data - The data to send in the POST request.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} - The response data.
 */
function post(url, data, token, isRequiredAuth) {
  const axiosInstance = createAxiosInstance(token, isRequiredAuth)
  return axiosInstance
    .post(url, data)
    .then((response) => response)
    .catch((error) => {
      console.error(`Error making POST request to ${url}:`, error)
      throw error
    })
}

export { get, post }
