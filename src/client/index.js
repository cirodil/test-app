import createClient from './http-client'

const client = createClient()

export default {
  async fetchMain(appId) {
    const response = await client.post('/main', { app_id: appId })
    return response.data
  },

  async fetchTurnstile(data) {
    const response = await client.post('/turnstile', data)
    return response.data
  },
}
