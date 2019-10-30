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
                            v-show='!doc.queryDate'
                            @click='sendToEtp(doc.queryId)') Запросить документ в БР

          

</template>
<script>
import { mapState } from 'vuex'
import fetchDocTypes from '@/services/api/requests/references/fetchDocTypes'
import fetchRequiredInterParam from '@/services/api/requests/fetchRequiredInterParam'
import sendToEtp from '@/services/api/requests/sendToEtp'

export default {
  name: 'QueriedDocsInderdeptRequest',
  data() {
    return {
      refDocTypes: []
    }
  },
  computed: {
    ...mapState({
      queriedDocs: (state) => state.request.request.gfQueriedDocsByRequestId
    }),
    computedQueriedDocs() {
      return (
        this.queriedDocs &&
        this.queriedDocs.map((doc) => {
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
    async sendToEtp(documentQueryId) {
      // TODO: fetchRequiredInterParam return respones with data. If data is not empty, need display this for user.
      await fetchRequiredInterParam({
        axiosModule: this.$axios,
        documentQueryId
      })

      sendToEtp({
        axiosModule: this.$axios,
        documentQueryId
      })
    },
    async fetchDocTypes() {
      this.refDocTypes = await fetchDocTypes({ axiosModule: this.$axios })
    }
  }
}
</script>
<style lang="sass"></style>
