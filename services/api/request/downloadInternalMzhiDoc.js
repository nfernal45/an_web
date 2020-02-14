import Vue from 'vue'
import { restApiGf } from '@/services/api/endpoints'

export default function({ axiosModule, docId }) {
  const url = restApiGf.gfAttachedDocs.file.replace('{id}', docId)

  try {
    const token = localStorage.getItem('auth._token.oauth2').split(' ')[1]
    window.location.assign(url + '?access_token=' + token)
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
