<template lang="pug">
  form-block.mb-10(title='Основные сведения')
    template(slot='content')
      el-form(size='small' label-position='top')
        el-row.mb-20(:gutter='20')
          el-col(:span='10')
            h4.form-title.mb-10 Цель обращения
            el-radio-group(v-model='requestTypeId')
              el-radio(
                v-for='item in computedRequestTypesOptions'
                :key='item.typeId'
                :label='item.typeId'
                style='margin-bottom: 5px'
              ) {{ item.typeName }}

          el-col(:span='14')
            el-row.mb-10
              h4.form-title.mb-10 Способ получения решения
              el-select.width-100(v-model='decisionIssueMethodId' size='small' placeholder='Укажите способ получения решения')
                el-option(v-for='item in decisionIssueMethodOptions'
                          :key='item.decisionIssueMethodId'
                          :label='item.decisionIssueMethodName'
                          :value='item.decisionIssueMethodId')
            el-row
              el-form-item(label='Плановый срок оказания ГФ')
                el-date-picker(
                  v-model='planConsidDate'
                  disabled
                  format='dd.MM.yyyy'
                  value-format='dd.MM.yyyy'
                  :picker-options='{ firstDayOfWeek: 1 }'
                )
        
        el-row.mb-20(:gutter='20')
          el-col.mt-10(:span='12')
            h4.form-title.mb-10 Место подачи документов
            el-radio-group(v-model='regPlaceId')
              el-radio(
                v-for='item in regPlaceOptions'
                :key='item.regPlaceId'
                :label='item.regPlaceId'
                :disabled='request.requestId && item.regPlaceId !== regPlaceId'
              ) {{ item.regPlaceName }}

          el-col(:span='12')
            el-form-item(label='ЕНО')
              el-input(v-model='eno' readonly)
        
        el-row(:gutter='20')
          el-col(:span='6')
            el-form-item(label='Рег.№')
              el-input(v-model='regnum')

          el-col(:span='6')
            el-form-item(v-if='regPlaceId === 1' label='Дата подачи заявления')
              el-date-picker(
                v-model='requestDate'
                placeholder='Укажите дату подачи заявления'
                format='dd.MM.yyyy'
                value-format='dd.MM.yyyy'
                :picker-options='{ firstDayOfWeek: 1 }'
              )

            el-form-item(v-if='regPlaceId === 2' label='Дата получения в МЖИ')
              el-date-picker(
                :picker-options='{ firstDayOfWeek: 1 }' 
                v-model='requestDate'
                placeholder='Укажите дату получения в МЖИ'
                format='dd.MM.yyyy'
                value-format='dd.MM.yyyy'
              )

          el-col(:span='12' v-if='regPlaceId === 1')
            employee-picker(
          
              v-model='regEmployeeId'
              label='Специалист службы одного окна'
            )

          el-col(:span='6' v-if='regPlaceId === 2')
            el-form-item(label='Рег.№ портала')
              el-input(v-model='outerRegnum')

          el-col(:span='6' v-if='regPlaceId === 2')
            el-form-item(label='Дата подачи на портале')
              el-date-picker(
                :picker-options='{ firstDayOfWeek: 1 }' 
                v-model='outerRequestDate'
                placeholder='Укажите дату подачи заявления'
                format='dd.MM.yyyy'
                value-format='dd.MM.yyyy'
              )



</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
import fetchRequestTypesOptions from '@/services/api/references/fetchRequestTypesOptions'
import fetchRegPlaceOptions from '@/services/api/references/fetchRegPlaceOptions'
const moduleName = 'request'
export default {
  name: 'RequestMainGeneralInfo',
  data() {
    return {
      requestTypesOptions: [],
      regPlaceOptions: [],
      decisionIssueMethodOptions: [
        {
          decisionIssueMethodName: 'В бумажном виде при личном посещении ОИВ',
          decisionIssueMethodId: 1
        },
        {
          decisionIssueMethodName: 'В электронном виде по электронной почте',
          decisionIssueMethodId: 2
        }
      ]
    }
  },
  computed: {
    ...mapState({
      request: (state) => state.request.request
    }),

    requestTypeId: {
      get() {
        return this.request.typeId
      },
      set(value) {
        this.set({ propName: 'typeId', propValue: value })
      }
    },

    decisionIssueMethodId: {
      get() {
        return this.request.decisionIssueMethodId
      },
      set(value) {
        this.set({ propName: 'decisionIssueMethodId', propValue: value })
      }
    },

    planConsidDate: {
      get() {
        return this.request.planConsidDate
      },
      set(value) {
        this.set({ propName: 'planConsidDate', propValue: value })
      }
    },

    regPlaceId: {
      get() {
        return this.request.regPlaceId
      },
      set(value) {
        this.set({ propName: 'regPlaceId', propValue: value })
      }
    },

    regnum: {
      get() {
        return this.request.regnum
      },
      set(value) {
        this.set({ propName: 'regnum', propValue: value })
      }
    },

    outerRegnum: {
      get() {
        return this.request.outerRegnum
      },
      set(value) {
        this.set({ propName: 'outerRegnum', propValue: value })
      }
    },

    requestDate: {
      get() {
        return this.request.requestDate
      },
      set(value) {
        this.set({ propName: 'requestDate', propValue: value })
      }
    },

    outerRequestDate: {
      get() {
        return this.request.outerRequestDate
      },
      set(value) {
        this.set({ propName: 'outerRequestDate', propValue: value })
      }
    },

    regEmployeeId: {
      get() {
        return this.request.regEmployeeId
      },
      set(value) {
        this.set({ propName: 'regEmployeeId', propValue: value })
      }
    },

    eno: {
      get() {
        return this.request.eno
      },
      set(value) {
        this.set({ propName: 'eno', propValue: value })
      }
    },

    computedRequestTypesOptions() {
      return this.requestTypesOptions
        .filter((type) => type.isGf)
        .sort((prevType, nextType) => {
          return prevType.typeId - nextType.typeId
        })
    }
  },
  mounted() {
    this.fetchRequestTypesOptions()
    this.fetchRegPlaceOptions()
  },
  methods: {
    ...mapMutations(moduleName, {
      set: mutationTypes.SET_PROP
    }),
    async fetchRequestTypesOptions() {
      this.requestTypesOptions = await fetchRequestTypesOptions({
        axiosModule: this.$axios
      })
    },
    async fetchRegPlaceOptions() {
      this.regPlaceOptions = await fetchRegPlaceOptions({
        axiosModule: this.$axios
      })
    }
  }
}
</script>
