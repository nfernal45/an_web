import qs from 'qs'
import { restApiAuth } from '@/services/api/endpoints'

let isRefreshing = false
let refreshingCallState

export default async function({ axiosModule, refreshToken }) {
  const url = restApiAuth.refreshToken

  if (isRefreshing) return refreshingCallState

  const params = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  }

  const refreshingCall = async function() {
    await axiosModule.$post(url, qs.stringify(params))
  }

  console.log(refreshingCall)

  try {
    isRefreshing = true
    refreshingCallState = refreshingCall
    const response = await refreshingCall()
    console.log('refresh is done', response)
    isRefreshing = false
    refreshingCallState = null

    refreshingCallState = refreshingCall
  } catch (error) {
    console.log('refresh is failed', error)
    isRefreshing = false
    refreshingCallState = null
  }
}
