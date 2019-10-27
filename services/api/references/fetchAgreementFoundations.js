/* eslint-disable no-console */
import Vue from 'vue'
import { restApiGfRef } from '@/services/api/endpoints'

const refName = 'ref_agreementFoundations'

export default async function({ axiosModule }) {
  const refOptions = Vue.ls.get(refName)

  if (refOptions) return refOptions

  try {
    const { data } = await axiosModule.$get(
      restApiGfRef.gfRefAgreementFoundations.list
    )
    Vue.ls.set(refName, data)
    return data
  } catch (error) {
    throw error
  }
}
