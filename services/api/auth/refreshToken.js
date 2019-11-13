/* eslint-disable no-unreachable */
/* eslint-disable no-console */
import Vue from 'vue'
import qs from 'qs'
// import { restApiGf } from '@/services/api/endpoints'
import {
  setLastTokenDate,
  checkUserSession
} from '@/services/helpers/auth/userSession'

let isRefreshing = false
let refreshingCallState

export default async function({ authModule, axiosModule }) {
  const isUserSessionActive = checkUserSession()

  if (!isUserSessionActive) {
    notify({ message: 'Ваша сессия истекла', type: 'info' })
    throw new Error('userSessionExpired')
  }

  const url = process.env.APP_AUTH_ACCESS_TOKEN_ENDPOINT

  if (isRefreshing) return refreshingCallState

  const params = {
    grant_type: 'refresh_token',
    refresh_token: authModule.getRefreshToken('oauth2').split(' ')[1]
  }

  const refreshingCall = function() {
    return axiosModule.$post(url, qs.stringify(params))
  }

  try {
    isRefreshing = true
    refreshingCallState = refreshingCall
    const response = await refreshingCall()
    const token = `Bearer ${response.access_token}`
    console.log('access_token')
    authModule.setToken('oauth2', token)
    setLastTokenDate()

    axiosModule.setHeader('Authorization', token)

    console.log('axiosModule', axiosModule)

    isRefreshing = false
    refreshingCallState = null
  } catch (error) {
    isRefreshing = false
    refreshingCallState = null
  }
}

function notify({ message, type }) {
  Vue.prototype.$notify({
    type,
    title: 'Внимание',
    message
  })
}
