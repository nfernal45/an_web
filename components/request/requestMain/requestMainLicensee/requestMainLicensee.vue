<template lang="pug">
  form-block.mb-10(title='Заявитель')
    template(slot='content')
      el-form(
        label-position='top'
        size='small'
        :disabled='disabledEditing || request.regPlaceId === 2'
      )
        el-row(:gutter='20')
          el-col(:span='16')
            el-row
              el-form-item(label='Тип заявителя')
                el-radio-group(v-model='licenseeType')
                  el-radio(
                    v-for='item in licenseeTypeOptions'
                    :key='item.licenseeTypeId'
                    :label='item.licenseeTypeId'
                  ) {{ item.licenseeTypeName }}

            el-row
              el-col
                el-form-item(v-show='licenseeType === "L"' label='Полное наименование')
                  el-input(v-model='licenseeFullname')
                el-form-item(label='Сокращенное наименование')
                  el-input(v-model='licenseeShortname')
                el-form-item(
                  v-if='request.typeId === 10'
                  label='Заявитель является представителем ТСЖ, ЖСК, ОСЖ'
                )
                  el-radio-group(v-model='isTsgRepr')
                    el-radio(
                      v-for='item in yesNoOptions'
                      :key='item.id'
                      :label='item.id'
                      style='margin-bottom: 5px'
                    ) {{ item.name }}

            el-row(v-show='licenseeType === "I"' :gutter='20')
              el-col(:span='8')
                el-form-item(label='Фамилия')
                  el-input(v-model='licenseeFLastName')
              el-col(:span='8')
                el-form-item(label='Имя')
                  el-input(v-model='licenseeFFirstName')
              el-col(:span='8')
                el-form-item(label='Отчество')
                  el-input(v-model='licenseeFSecondName')

          el-col(:span='8')
            el-form-item(label='ИНН')
              el-input(
                v-model='licenseeInn'
                :maxlength='licenseeType === "L" ? 10 : 12')
            el-form-item(label='ОГРН')
              el-input(v-model='licenseeOgrn' :maxlength='licenseeType === "L" ? 13 : 15')
            el-form-item(label='Телефон')
              el-input(v-model='licenseePhone')
            el-form-item(label='Электронная почта')
              el-input(v-model='licenseeEmail')

</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
const moduleName = 'request'
export default {
  name: 'RequestMainLicensee',
  props: {
    disabledEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      licenseeTypeOptions: [
        {
          licenseeTypeName: 'Юридическое лицо',
          licenseeTypeId: 'L'
        },
        {
          licenseeTypeName: 'ИП',
          licenseeTypeId: 'I'
        }
      ],
      onlyNumbers: /^[-+]?[0-9]+$/,
      numbersWithLeadingZero: /^([0-9]+)$/,
      yesNoOptions: [
        {
          id: 'Y',
          name: 'Да'
        },
        {
          id: 'N',
          name: 'Нет'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      request: (state) => state.request.request
    }),

    licenseeType: {
      get() {
        return this.request.licenseeType
      },
      set(value) {
        this.set({ propName: 'licenseeType', propValue: value })
      }
    },

    requestTypeId: {
      get() {
        return this.request.typeId
      }
    },

    isTsgRepr: {
      get() {
        return this.request.isTsgRepr
      },
      set(value) {
        this.set({ propName: 'isTsgRepr', propValue: value })
      }
    },

    licenseeFullname: {
      get() {
        return this.request.licenseeFullname
      },
      set(value) {
        this.set({ propName: 'licenseeFullname', propValue: value })
      }
    },

    licenseeShortname: {
      get() {
        return this.request.licenseeShortname
      },
      set(value) {
        this.set({ propName: 'licenseeShortname', propValue: value })
      }
    },

    licenseeInn: {
      get() {
        return this.request.licenseeInn
      },
      set(value) {
        if (value.match(this.numbersWithLeadingZero) || !value.length)
          this.set({
            propName: 'licenseeInn',
            propValue: value.toString()
          })
      }
    },

    licenseeOgrn: {
      get() {
        return this.request.licenseeOgrn
      },
      set(value) {
        if (value.match(this.onlyNumbers) || !value.length)
          this.set({
            propName: 'licenseeOgrn',
            propValue: value.length ? Number(value) : value
          })
      }
    },

    licenseePhone: {
      get() {
        return this.request.licenseePhone
      },
      set(value) {
        this.set({ propName: 'licenseePhone', propValue: value })
      }
    },

    licenseeEmail: {
      get() {
        return this.request.licenseeEmail
      },
      set(value) {
        this.set({ propName: 'licenseeEmail', propValue: value })
      }
    },

    licenseeFLastName: {
      get() {
        return this.request.licenseeFLastName
      },
      set(value) {
        this.set({ propName: 'licenseeFLastName', propValue: value })
      }
    },

    licenseeFFirstName: {
      get() {
        return this.request.licenseeFFirstName
      },
      set(value) {
        this.set({ propName: 'licenseeFFirstName', propValue: value })
      }
    },

    licenseeFSecondName: {
      get() {
        return this.request.licenseeFSecondName
      },
      set(value) {
        this.set({ propName: 'licenseeFSecondName', propValue: value })
      }
    }
  },
  watch: {
    requestTypeId() {
      this.isTsgRepr = null
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
