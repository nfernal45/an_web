import Vue from 'vue'
import { restApiNsi } from '@/services/api/endpoints'

const refName = 'ref_dept'

export default async function({ axiosModule }) {
  const refOptions = Vue.ls.get(refName)

  if (refOptions) return refOptions

  try {
    const { data } = await axiosModule.$get(restApiNsi.nsiRefDept.list)
    Vue.ls.set(refName, data)
    return data
  } catch (error) {
    throw error
  }
}
