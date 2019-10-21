/* eslint-disable no-console */
import Vue from 'vue'
import { restApiGuRef } from '@/services/api/endpoints'

const refName = 'ref_requestTypesList'

export default async function({ axiosModule }) {
  const appealsTypesOnptions = Vue.ls.get(refName)

  if (appealsTypesOnptions) return appealsTypesOnptions

  try {
    const { data } = await axiosModule.$get(restApiGuRef.guRefAppealTypes.list)
    Vue.ls.set(refName, data)
    return data
  } catch (error) {
    throw error
  }
}
