<template lang="pug">
  form-block.mb-10(title='Уполномоченная организация - представитель заявителя')
    template(slot='content')
      el-form(
        label-position='top'
        size='small'
        :disabled='disabledEditing || request.regPlaceId === 2'
      )
        el-row(:gutter='20')
          el-col(:span='16')
            el-row
              el-form-item(label='Тип представителя')
                el-radio-group(v-model='reprType')
                  el-radio(
                    v-for='item in reprTypeOptions'
                    :key='item.reprTypeId'
                    :label='item.reprTypeId'
                  ) {{ item.reprTypeName }}
            el-row
              el-col
                el-form-item(v-show='reprType === "L"' label='Полное наименование')
                  el-input(v-model='reprFullname')
                el-form-item(label='Сокращенное наименование')
                  el-input(v-model='reprShortname')

            el-row(v-show='reprType === "I"' :gutter='20')
              el-col(:span='8')
                el-form-item(label='Фамилия')
                  el-input(v-model='reprLastName')
              el-col(:span='8')
                el-form-item(label='Имя')
                  el-input(v-model='reprFirstName')
              el-col(:span='8')
                el-form-item(label='Отчество')
                  el-input(v-model='reprSecondName')

          el-col(:span='8')
            el-form-item(label='ИНН')
              el-input(v-model='reprInn' :maxlength='reprType === "L" ? 10 : 12')
            el-form-item(:label='reprType === "L" ? "ОГРН" : "ОГРНИП"')
              el-input(v-model='reprOgrn' :maxlength='reprType === "L" ? 13 : 15')
            el-form-item(label='Телефон')
              el-input(v-model='reprPhone')
            el-form-item(label='Электронная почта')
              el-input(v-model='reprEmail')

</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
const moduleName = 'request'
export default {
  name: 'RequestMainLicenseeRepresentative',
  props: {
    disabledEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      reprTypeOptions: [
        {
          reprTypeName: 'Юридическое лицо',
          reprTypeId: 'L'
        },
        {
          reprTypeName: 'ИП',
          reprTypeId: 'I'
        }
      ],
      onlyNumbers: /^[-+]?[0-9]+$/,
      numbersWithLeadingZero: /^([0-9]+)$/
    }
  },
  computed: {
    ...mapState({
      request: (state) => state.request.request
    }),

    reprType: {
      get() {
        return this.request.reprType
      },
      set(value) {
        this.set({ propName: 'reprType', propValue: value })
      }
    },

    reprFullname: {
      get() {
        return this.request.reprFullname
      },
      set(value) {
        this.set({ propName: 'reprFullname', propValue: value })
      }
    },

    reprShortname: {
      get() {
        return this.request.reprShortname
      },
      set(value) {
        this.set({ propName: 'reprShortname', propValue: value })
      }
    },

    reprInn: {
      get() {
        return this.request.reprInn
      },
      set(value) {
        if (value.match(this.numbersWithLeadingZero) || !value.length)
          this.set({
            propName: 'reprInn',
            propValue: value.toString()
          })
      }
    },

    reprOgrn: {
      get() {
        return this.request.reprOgrn
      },
      set(value) {
        if (value.match(this.onlyNumbers) || !value.length)
          this.set({
            propName: 'reprOgrn',
            propValue: value.length ? Number(value) : value
          })
      }
    },

    reprPhone: {
      get() {
        return this.request.reprPhone
      },
      set(value) {
        this.set({ propName: 'reprPhone', propValue: value })
      }
    },

    reprEmail: {
      get() {
        return this.request.reprEmail
      },
      set(value) {
        this.set({ propName: 'reprEmail', propValue: value })
      }
    },

    reprLastName: {
      get() {
        return this.request.reprLastName
      },
      set(value) {
        this.set({ propName: 'reprLastName', propValue: value })
      }
    },

    reprFirstName: {
      get() {
        return this.request.reprFirstName
      },
      set(value) {
        this.set({ propName: 'reprFirstName', propValue: value })
      }
    },

    reprSecondName: {
      get() {
        return this.request.reprSecondName
      },
      set(value) {
        this.set({ propName: 'reprSecondName', propValue: value })
      }
    }
  },
  methods: {
    ...mapMutations(moduleName, {
      set: mutationTypes.SET_PROP
    })
  }
}
</script>
<style lang="sass"></style>
