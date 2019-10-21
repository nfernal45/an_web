<template lang="pug">
  form-block(title='Запрос документов в базовом регистре для проверки предоставленных сведений')
    template(slot='content')
      el-form(size='small' label-position='top')
        el-row
          el-col
            el-card.mb-20(v-for='doc in queriedDocs'
                    :key='doc.queryId'
                    shadow='hover')
            
              el-row
                el-col
                  h4 title
              el-row(:gutter='20')
                el-col(:span='6')
                  el-form-item(label='Дата запроса')
                    el-date-picker(v-model='doc.queryDate'
                                  type='date'
                                  format="dd.MM.yyyy"
                                  value-format="dd.MM.yyyy"
                                  placeholder='Выберите дату')
                el-col(:span='6')
                  el-form-item(label='Дата ответа')
                    el-date-picker(v-model='doc.receiveDate'
                                  type='date'
                                  format="dd.MM.yyyy"
                                  value-format="dd.MM.yyyy"
                                  placeholder='Выберите дату')
              el-row
                el-col(:span='12')
                  el-form-item(label='Примечание')
                    el-input(v-model='doc.comments')
              el-row
                el-col
                  el-button(type='primary'
                            @click='sendMvRequest(doc.queryId)') Запросить документ в БР

          

</template>
<script>
import { mapState } from 'vuex'
import mvRequest from '@/services/api/requests/mvRequest'

// eslint-disable prettier/prettier

export default {
  name: 'QueriedDocsInderdeptRequest',
  date: () => ({}),
  computed: {
    ...mapState({
      queriedDocs: (state) => state.appeal.appeal.gfQueriedDocsByRequestId
    })
  },
  created() {
    console.log(this.queriedDocs)
  },
  methods: {
    async sendMvRequest(documentId) {
      try {
        await mvRequest(this.$axios, documentId)

        this.$notify.success({
          title: 'Внимание',
          message: 'Запрос успешно отправлен'
        })
      } catch (e) {
        this.$notify.error({
          title: 'Внимание',
          message: 'Всё печально'
        })
      }
    }
  }
}
</script>
<style lang="sass"></style>
