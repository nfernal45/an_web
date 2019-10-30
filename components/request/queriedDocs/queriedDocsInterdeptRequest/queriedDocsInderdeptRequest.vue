<template lang="pug">
  form-block(title='Запрос документов в базовом регистре для проверки предоставленных сведений')
    template(slot='content')
      el-form(size='small' label-position='top')
        el-row
          el-col
            el-card.mb-20(v-for='doc in computedQueriedDocs'
                    :key='doc.queryId'
                    shadow='hover')
              el-row.mb-10
                el-col
                  h4 {{ doc.docTypeName }}
              el-row(:gutter='20')
                el-col(:span='6')
                  el-form-item(label='Дата запроса')
                    el-date-picker(
                      :picker-options='{ firstDayOfWeek: 1 }'
                      v-model='doc.queryDate'
                      type='date'
                      format="dd.MM.yyyy"
                      value-format="dd.MM.yyyy"
                      placeholder='Выберите дату'
                    )
                el-col(:span='6')
                  el-form-item(label='Дата ответа')
                    el-date-picker(
                      :picker-options='{ firstDayOfWeek: 1 }'
                      v-model='doc.receiveDate'
                      type='date'
                      format="dd.MM.yyyy"
                      value-format="dd.MM.yyyy"
                      placeholder='Выберите дату'
                    )
              el-row
                el-col(:span='12')
                  el-form-item(label='Примечание')
                    el-input(v-model='doc.comments')
              el-row
                el-col
                  el-button(type='primary'
                            :loading='isSendingToEtp'
                            v-show='!doc.queryDate'
                            @click='sendToEtp(doc.queryId)') Запросить документ в БР

          

</template>
<script>
import { mapState, mapActions } from 'vuex'
import fetchDocTypes from '@/services/api/requests/references/fetchDocTypes'
import fetchRequiredInterParam from '@/services/api/requests/fetchRequiredInterParam'
import sendToEtp from '@/services/api/requests/sendToEtp'
import { actionTypes } from '@/store/types/request'
const moduleName = 'request'
export default {
  name: 'QueriedDocsInderdeptRequest',
  data() {
    return {
      refDocTypes: [],
      isSendingToEtp: false
    }
  },
  computed: {
    ...mapState(moduleName, {
      request: (state) => state.request
    }),
    computedQueriedDocs() {
      return (
        this.request &&
        this.request.gfQueriedDocsByRequestId &&
        this.request.gfQueriedDocsByRequestId.map((doc) => {
          const docTypeName =
            this.refDocTypes.length &&
            this.refDocTypes.find((item) => item.typeId === doc.docTypeId)
              .typeName
          return Object.assign({}, doc, { docTypeName })
        })
      )
    }
  },
  mounted() {
    this.fetchDocTypes()
  },
  methods: {
    ...mapActions(moduleName, {
      fetchRequest: actionTypes.FETCH_REQUEST
    }),
    async sendToEtp(documentQueryId) {
      this.isSendingToEtp = true
      // TODO: fetchRequiredInterParam return respones with data. If data is not empty, need display this for user.
      await fetchRequiredInterParam({
        axiosModule: this.$axios,
        documentQueryId
      })

      await sendToEtp({
        axiosModule: this.$axios,
        documentQueryId
      })

      await this.fetchRequest(this.request.requestId)
    },
    async fetchDocTypes() {
      this.refDocTypes = await fetchDocTypes({ axiosModule: this.$axios })
    }
  }
}
</script>
<style lang="sass"></style>
