import Vue from 'vue'
import { restApiGfRef } from '@/services/api/endpoints'

const refName = 'ref_yesNoValues'

export default async function({ axiosModule }) {
  const refOptions = Vue.ls.get(refName)

  if (refOptions) return refOptions

  try {
    const { data } = await axiosModule.$get(restApiGfRef.gfRefYesNoValues.list)
    Vue.ls.set(refName, data.sort((a, b) => (a.id < b.id ? 1 : -1)))
    return data
  } catch (error) {
    throw error
  }
}
