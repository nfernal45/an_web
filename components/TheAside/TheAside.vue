<template lang="pug">
  el-aside(width="200px" :class="styles.aside")
    ul(:class="styles['list']")
      li(:class="styles['list-item']")
        nuxt-link(to="/registry")
          el-button(
            type="primary"
            :class="styles['list-button']"
            :disabled="isRequestSaving"
            v-show='can("RL_GF_READONLY")')
            font-awesome-icon(icon="reply")
            span Назад к списку
      li(:class="styles['list-item']")
        el-button(
          v-show="can('RL_GF_REQUEST_SAVE')"
          type="success"
          :class="styles['list-button']"
          @click="onSave()" :loading='isRequestSaving')
          font-awesome-icon(icon="save")
          span Сохранить
      li(:class="styles['list-item']")
        el-button(
          type="primary"
          plain
          :class="styles['list-button']"
          :disabled="isRequestSaving"
          @click="print()")
          font-awesome-icon(icon="print")
          span Печать

    // Кнопки стасусов
    the-aside-statuses-buttons

    print-form-dialog(:isDialogVisible='isDialogVisible' @close='isDialogVisible = false')

</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import TheAsideStatusesButtons from './TheAsideStatusesButtons'
import styles from './TheAside.module.sass?module'
import {
  actionTypes as requestActionTypes,
  mutationTypes as requestMutationsTypes
} from '@/store/types/request'
import isNumber from '@/services/helpers/isNumber'
import printFormDialog from '@/components/printFormDialog/printFormDialog'
import { validation } from '@/services/requestValidation'

const moduleName = 'request'
export default {
  name: 'TheAside',
  components: {
    TheAsideStatusesButtons,
    printFormDialog
  },
  data() {
    return {
      isDialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['can', 'canAny']),
    ...mapState(moduleName, {
      request: (state) => state.request,
      docCheck: (state) => state.docCheck,
      isRequestSaving: (state) => state.isRequestSaving
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
      setIsRequestSaving: requestMutationsTypes.SET_IS_REQUEST_SAVING
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
      const canSave = validation(this.request, { docCheck: this.docCheck })

      if (canSave) {
        this.setIsRequestSaving(true)
        try {
          await this.saveRequestRelated()
          this.openNewCreatedRequestPage()
          this.setIsRequestSaving(false)
        } catch (error) {
          this.setIsRequestSaving(false)
        }
      }

      return false
    },
    print() {
      this.isDialogVisible = true
    }
  }
}
</script>
