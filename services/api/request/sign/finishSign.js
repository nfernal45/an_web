import { restApiGf } from '@/services/api/endpoints'

export default async function({
  axiosModule,
  etpOutMessageEntityId,
  appSign,
  requestSign
}) {
  const url = restApiGf.gfQueriedDocs.finishSign
  const { data } = await axiosModule({
    method: 'POST',
    url,
    data: {
      etpOutMessageEntityId,
      appSign,
      requestSign
    }
  })
  return data
}
