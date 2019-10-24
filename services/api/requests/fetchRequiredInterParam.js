import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, documentQueryId }) {
  try {
    const url = restApiGf.gfQueriedDocs.requiredInterParam.replace(
      '{id}',
      documentQueryId
    )
    const { content } = await axiosModule.$get(url)
    return content
  } catch (error) {
    throw error
  }
}
