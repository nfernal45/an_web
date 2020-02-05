import Vue from 'vue'
import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, docId }) {
  const url = restApiGf.gfAttachedDocs.file.replace('{id}', docId)

  try {
    const { data } = await axiosModule.delete(url)

    return data
  } catch (error) {
    if (error.response.status === 404) return false

    if (error.status === 400) {
      Vue.prototype.$notify({
        type: 'warning',
        title: 'Внимание',
        message: error.message
      })
    } else {
      Vue.prototype.$notify.error({
        title: 'Ошибка удаления файла',
        message: error.message
      })
    }
  }
}
