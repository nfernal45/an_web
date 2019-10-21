/* eslint-disable no-console */
import Vue from 'vue'
import { restApiGuRef } from '@/services/api/endpoints'

const refName = 'ref_requestTypesList'

export default async function({ axiosModule }) {
  const requestsTypesOnptions = Vue.ls.get(refName)

  if (requestsTypesOnptions) return requestsTypesOnptions

  try {
    const { data } = await axiosModule.$get(restApiGuRef.guRefRequestTypes.list)
    Vue.ls.set(refName, data)
    return data
  } catch (error) {
    throw error
  }
}
