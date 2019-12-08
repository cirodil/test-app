import axios from 'axios'

export default function createClient() {
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  })
}
