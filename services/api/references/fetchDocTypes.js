import Vue from 'vue'
import { restApiGuRef } from '@/services/api/endpoints'

const refName = 'ref_docTypes'

export default async function({ axiosModule }) {
  const refOptions = Vue.ls.get(refName)
  if (refOptions) return refOptions

  try {
    const { data } = await axiosModule.$get(restApiGuRef.guRefDocType.list)
    Vue.ls.set(refName, data)
    return data
  } catch (error) {
    throw error
  }
}
