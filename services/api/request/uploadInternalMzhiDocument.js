import Vue from 'vue'
import { restApiGf } from '@/services/api/endpoints'

export default async function({ axiosModule, documentId, file }) {
  const url = restApiGf.gfAttachedDocs.file.replace('{id}', documentId)

  const formData = new FormData()

  formData.append('file', file)

  try {
    const { data } = await axiosModule({
      url,
      method: 'PUT',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return data
  } catch (error) {
    if (error.status === 400) {
      Vue.prototype.$notify({
        type: 'warning',
        title: 'Внимание',
        message: error.message
      })
    } else {
      Vue.prototype.$notify.error({
        title: 'Ошибка загрузки файла',
        message: error.message
      })
    }
  }
}
