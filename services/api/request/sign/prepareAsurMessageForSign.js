import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, queriedDocId }) {
  const url = restApiGf.gfQueriedDocs.prepareAsurMessageForSign.replace(
    '{queriedDocId}',
    queriedDocId
  )
  const { data } = await axiosModule({ method: 'POST', url })
  return data
}
