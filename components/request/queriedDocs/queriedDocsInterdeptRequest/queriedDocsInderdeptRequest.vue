<template lang="pug">
  form-block(title='Запрос документов в базовом регистре для проверки предоставленных сведений')
    template(slot='content')
      el-form(size='small' label-position='top')
        el-row.mb-10
          el-col
            el-popover(placement='top'
                       width='430'
                       v-model='isAddDocumentPopoverVisible')
              el-form-item(label='Тип документа')
                el-select(v-model='additionalDocumentTypeId' 
                          size='small'
                          style='width: 400px')
                  el-option(v-for='item in refDocTypes'
                            :key='item.typeId'
                            :value='item.typeId'
                            :label='item.typeName')
              div
                el-button(size='mini' 
                          type='primary' 
                           @click='addDocument(additionalDocumentTypeId)' 
                           :disabled='!additionalDocumentTypeId') Добавить
                el-button(size='mini' 
                          type='text'
                          @click='isAddDocumentPopoverVisible = false') Отмена
              el-button(slot='reference'
                        type='primary') Добавить документ

        el-row
          el-col
            el-card.mb-20(v-for='(doc, index) in computedQueriedDocs'
                    :key='doc.queryId'
                    shadow='hover')
              el-row.mb-10
                el-col
                  h4 {{ doc.docTypeName }}
              el-row(:gutter='20')
                el-col(:span='7')
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
                el-col(:span='14')
                  el-form-item(label='Примечание')
                    el-input(v-model='doc.comments')
              el-row
                el-col
                  el-button(type='primary'
                            ref='etp'
                            v-show='!doc.queryDate'
                            @click='sendToEtp(doc.queryId, index)') Запросить документ в БР

        
          

</template>
<script>
import { Loading } from 'element-ui'
import { mapState, mapActions, mapMutations } from 'vuex'
import { mutationTypes, actionTypes } from '@/store/types/request'
import fetchDocTypes from '@/services/api/requests/references/fetchDocTypes'
import fetchRequiredInterParam from '@/services/api/requests/fetchRequiredInterParam'
import sendToEtp from '@/services/api/requests/sendToEtp'

const moduleName = 'request'
export default {
  name: 'QueriedDocsInderdeptRequest',
  data() {
    return {
      refDocTypes: [],
      isAddDocumentPopoverVisible: false,
      additionalDocumentTypeId: null
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
      fetchRequest: actionTypes.FETCH_REQUEST,
      saveRequest: actionTypes.SAVE_REQUEST
    }),
    ...mapMutations(moduleName, {
      setProp: mutationTypes.SET_PROP
    }),
    async sendToEtp(documentQueryId, index) {
      const el = this.$refs.etp[index].$el

      const loading = Loading.service({
        target: el
      })

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

      loading.close()
    },
    async fetchDocTypes() {
      this.refDocTypes = await fetchDocTypes({ axiosModule: this.$axios })
    },
    addDocument(docTypeId) {
      const array = [...this.request.gfQueriedDocsByRequestId]
      const item = { docTypeId }

      array.push(item)

      this.setProp({ propName: 'gfQueriedDocsByRequestId', propValue: array })

      this.isAddDocumentPopoverVisible = false
      this.additionalDocumentTypeId = null

      this.saveRequest()
    }
  }
}
</script>
<style lang="sass"></style>
