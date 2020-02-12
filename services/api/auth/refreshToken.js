import Vue from 'vue'
import qs from 'qs'
import {
  setLastTokenDate,
  checkUserSession
} from '@/services/helpers/auth/userSession'

let isRefreshing = false
let refreshingCallState
let isUserSessionChecked = false

export default function({ authModule, axiosModule }) {
  const isUserSessionActive = checkUserSession()

  if (!isUserSessionActive) {
    if (!isUserSessionChecked) {
      notify({ message: 'Ваша сессия истекла', type: 'info' })
    }
    isUserSessionChecked = true
    throw new Error('userSessionExpired')
  }

  const url = process.env.APP_AUTH_ACCESS_TOKEN_ENDPOINT

  if (isRefreshing) return refreshingCallState

  const params = {
    grant_type: 'refresh_token',
    refresh_token: authModule.getRefreshToken('oauth2').split(' ')[1]
  }

  isRefreshing = true

  const refreshingCall = axiosModule
    .$post(url, qs.stringify(params))
    .then((response) => {
      const token = `Bearer ${response.access_token}`
      axiosModule.setHeader('Authorization', token)
      authModule.setToken('oauth2', token)
      isRefreshing = false
      refreshingCallState = undefined
      setLastTokenDate()
      return Promise.resolve(true)
    })
    .catch((error) => {
      return Promise.reject(error)
    })

  refreshingCallState = refreshingCall
  return refreshingCall
}

function notify({ message, type }) {
  Vue.prototype.$notify({
    type,
    title: 'Внимание',
    message
  })
}
