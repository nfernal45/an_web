import Vue from 'vue'
import { restApiGfRef } from '@/services/api/endpoints'

const refName = 'ref_acceptReasons'

export default async function({ axiosModule }) {
  const refOptions = Vue.ls.get(refName)
  if (refOptions) return refOptions

  try {
    const { data } = await axiosModule.$get(
      restApiGfRef.gfRefAcceptReasons.list
    )
    Vue.ls.set(refName, data)
    return data
  } catch (error) {
    throw error
  }
}
