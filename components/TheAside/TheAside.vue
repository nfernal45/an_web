<template lang="pug">
  el-aside(width="200px" :class="styles.aside")
    ul(:class="styles['list']")
      li(:class="styles['list-item']")
        nuxt-link(to="/registry")
          el-button(type="primary" :class="styles['list-button']")
            font-awesome-icon(icon="reply")
            span Назад к списку
      li(:class="styles['list-item']")
        el-button(type="success" :class="styles['list-button']" @click="onSave()" :loading='isRequestSaving')
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
import { mapActions, mapState, mapMutations } from 'vuex'
import TheAsideStatusesButtons from './TheAsideStatusesButtons'
import styles from './TheAside.module.sass?module'
import {
  actionTypes as requestActionTypes,
  mutationTypes as requestMutationTypes
} from '@/store/types/request'
import isNumber from '@/services/helpers/isNumber'

const moduleName = 'request'
export default {
  name: 'TheAside',
  components: {
    TheAsideStatusesButtons
  },
  data() {
    return {
      isRequestSaving: false
    }
  },
  computed: {
    ...mapState({
      request: (state) => state.request.request,
      docCheck: (state) => state.request.docCheck
    }),

    styles() {
      return styles
    }
  },
  methods: {
    ...mapActions(moduleName, {
      saveRequestRelated: requestActionTypes.SAVE_REQUEST_RELATED
    }),
    ...mapMutations(moduleName, {
      setDefaultObject: requestMutationTypes.SET_DEFAULT_OBJECT
    }),
    openNewCreatedRequestPage() {
      if (!isNumber(this.$route.params.id)) {
        this.$router.replace({
          name: 'request-id-main',
          params: { id: this.request.requestId }
        })
      }
    },
    async onSave() {
      this.isRequestSaving = true
      try {
        await this.saveRequestRelated()
        this.openNewCreatedRequestPage()
        this.isRequestSaving = false
      } catch (error) {
        this.isRequestSaving = false
      }
    },
    print() {
      alert('Функционал находится в разработке')
    }
  }
}
</script>
