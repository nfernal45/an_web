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

    print-form-dialog(:isDialogVisible='isDialogVisible' @close='isDialogVisible = false')

</template>
<script>
import { mapActions, mapState } from 'vuex'
import TheAsideStatusesButtons from './TheAsideStatusesButtons'
import styles from './TheAside.module.sass?module'
import { actionTypes as requestActionTypes } from '@/store/types/request'
import isNumber from '@/services/helpers/isNumber'
import printFormDialog from '@/components/printFormDialog/printFormDialog'

const moduleName = 'request'
export default {
  name: 'TheAside',
  components: {
    TheAsideStatusesButtons,
    printFormDialog
  },
  data() {
    return {
      isRequestSaving: false,
      isDialogVisible: false
    }
  },
  computed: {
    ...mapState(moduleName, {
      request: (state) => state.request,
      docCheck: (state) => state.docCheck
    }),

    styles() {
      return styles
    }
  },
  methods: {
    ...mapActions(moduleName, {
      saveRequestRelated: requestActionTypes.SAVE_REQUEST_RELATED
    }),
    openNewCreatedRequestPage() {
      if (!isNumber(this.$route.params.id)) {
        this.$router.replace({
          name: 'request-id-main',
          params: { id: this.request.requestId }
        })
      }
    },
    validation() {
      if (this.request.licenseeType === 'L') {
        if (String(this.request.licenseeInn).length < 10) {
          this.$notify.warning({
            title: 'Внимание',
            message:
              'Для данного типа заявителя/представителя заявителя допустимая длина поля "ИНН": 10 символов.'
          })

          return false
        } else if (String(this.request.licenseeOgrn).length < 13) {
          this.$notify.warning({
            title: 'Внимание',
            message:
              'Для данного типа заявителя/представителя заявителя допустимая длина поля "ОГРН": 13 символов.'
          })

          return false
        }
      } else if (this.request.licenseeType === 'I') {
        if (String(this.request.licenseeInn).length < 12) {
          this.$notify.warning({
            title: 'Внимание',
            message:
              'Для данного типа заявителя/представителя заявителя допустимая длина поля "ИНН": 12 символов.'
          })

          return false
        } else if (String(this.request.licenseeOgrn).length < 15) {
          this.$notify.warning({
            title: 'Внимание',
            message:
              'Для данного типа заявителя/представителя заявителя допустимая длина поля "ИНН": 15 символов.'
          })

          return false
        }
      }

      return true
    },
    async onSave() {
      const canSave = this.validation()

      if (canSave) {
        this.isRequestSaving = true
        try {
          await this.saveRequestRelated()
          this.openNewCreatedRequestPage()
          this.isRequestSaving = false
        } catch (error) {
          this.isRequestSaving = false
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
