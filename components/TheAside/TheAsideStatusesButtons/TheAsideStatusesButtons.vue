<template lang="pug">
  div(
    id='status-buttons'
    v-show='request.requestId'
    style='margin-top: 40px; min-height: 38px;'
  )
    ul(:class='styles["list"]')
      li(v-for='(button, index) in requestStatuses' :key='index' :class='styles["list-item"]')
        el-button(
          type='warning' 
          plain 
          :class='styles["list-button", "status-button"]'
          @click='onStatusChange(button.statusId)'
        ) {{ button.buttonName }}

</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import styles from './TheAsideStatusesButtons.module.sass?module'
import { getterTypes as referencesGetterTypes } from '@/store/types/references'
import { actionTypes as requestActionTypes } from '@/store/types/request'

const requestModuleName = 'request'
const referencesModuleName = 'references'

export default {
  name: 'TheAsideStatusesButtons',
  computed: {
    ...mapState({
      request: (state) => state.request.request,
      requestStatuses: (state) => state.request.requestStatuses,
      mzhiAttachedDocs: (state) => state.request.mzhiAttachedDocs,
      docTypesConstants: (state) => state.request.docTypesConstants
    }),

    ...mapGetters(referencesModuleName, {
      requestStatusesConstants:
        referencesGetterTypes.GET_REQUEST_STATUSES_OPTIONS_CONSTANTS
    }),

    styles() {
      return styles
    }
  },
  methods: {
    ...mapActions(requestModuleName, {
      changeRequestStatus: requestActionTypes.CHANGE_REQUEST_STATUS
    }),

    checkRequestDecision(nextStatusId) {
      return nextStatusId > this.requestStatusesConstants.REVIEW
        ? this.request.decisionType
        : true
    },

    getRequredMzhiDocName(nextStatusId) {
      let docName
      const statusConstants = this.requestStatusesConstants
      const mzhiAttachedDocs = this.mzhiAttachedDocs

      const getRequiredDocWarehouseName = (docTypeName) => {
        const isDocExist = mzhiAttachedDocs
          .map((doc) => doc.refDocTypeByDocTypeId.typeId)
          .includes(this.docTypesConstants[docTypeName].typeId)

        return isDocExist
          ? null
          : this.docTypesConstants[docTypeName].warehouseName
      }

      switch (nextStatusId) {
        case statusConstants.RESUMED:
          docName = getRequiredDocWarehouseName(
            'ExtractOrReceiptOnRegistrationOfApplication'
          )
          break

        case statusConstants.DECISIONMADE:
          if (this.request.decisionType === 'D') {
            docName = getRequiredDocWarehouseName(
              'NotificationOfProvisionOfServices'
            )
          }

          if (this.request.decisionType === 'R') {
            docName = getRequiredDocWarehouseName(
              'ProvideServicesRefuseDecision'
            )
          }

          break

        case statusConstants.VIOLATIONELIMINATION:
          docName = getRequiredDocWarehouseName(
            'DecisionOnSuspensionOfProvidingTheStateService'
          )
          break

        default:
          docName = null
          break
      }

      return docName
    },

    // onStatusChange(nextStatusId) {
    async onStatusChange(nextStatusId) {
      const isDecisionCheckSuccessfull = this.checkRequestDecision(nextStatusId)

      if (!isDecisionCheckSuccessfull) {
        this.$notify({
          title: 'Внимание',
          message: `Необходимо указать тип решения по заявлению`,
          duration: 3000,
          type: 'warning'
        })
        return
      }

      const documentName = this.getRequredMzhiDocName(nextStatusId)

      if (documentName) {
        this.$notify({
          title: 'Внимание',
          message: `Необходимо приложить документ <strong>"${documentName}"</strong>`,
          duration: 3000,
          type: 'warning',
          dangerouslyUseHTMLString: true
        })
        return
      }


      // eslint-disable-next-line no-unreachable
      const loading = this.$loading({
        target: '#status-buttons',
        lock: true,
        customClass: this.styles['el-loading-mask']
      })
      await this.changeRequestStatus(nextStatusId)
      loading.close()
    }
  }
}
</script>
