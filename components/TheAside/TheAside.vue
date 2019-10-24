<template lang="pug">
  el-aside(width="200px" :class="styles.aside")
    ul(:class="styles['list']")
      li(:class="styles['list-item']")
        nuxt-link(to="/registry")
          el-button(type="primary" :class="styles['list-button']")
            font-awesome-icon(icon="reply")
            span Назад к списку
      li(:class="styles['list-item']")
        el-button(type="success" :class="styles['list-button']" @click="onSave()")
          font-awesome-icon(icon="save")
          span Сохранить
      li(:class="styles['list-item']")
        el-button(type="primary" plain :class="styles['list-button']" @click="print()")
          font-awesome-icon(icon="print")
          span Печать

    // Кнопки стасусов
    the-aside-statuses-buttons

</template>
<script>
import { mapActions } from 'vuex'
import TheAsideStatusesButtons from './TheAsideStatusesButtons'
import styles from './TheAside.module.sass?module'
import { actionTypes as requestActionTypes } from '@/store/types/request'
const moduleName = 'request'
export default {
  name: 'TheAside',
  components: {
    TheAsideStatusesButtons
  },
  data() {
    return {
      requestStatus: 1
    }
  },
  computed: {
    styles() {
      return styles
    }
  },
  methods: {
    ...mapActions(moduleName, {
      saveRequest: requestActionTypes.SAVE_REQUEST
    }),
    onSave() {
      this.saveRequest()
    },
    print() {
      alert('Функционал находится в разработке')
    }
  }
}
</script>
