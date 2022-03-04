<template lang="pug">
  form-block.mb-10(v-if="showBlock()" title='Сведения о договоре управления многоквартирным домом')
    template(slot='content')
      el-form(
        label-position='top'
        size='small'
        :disabled='disabledEditing'
      )
        el-row(:gutter='20')

          el-col(:span='6')
            el-form-item(label='Номер')
              el-input(v-model='infMkbNum' :maxlength='250' :disabled='request.regPlaceId === 2')

          el-col(:span='6')
            el-form-item(label='Дата')
              el-date-picker(
                :picker-options='{ firstDayOfWeek: 1 }'
                v-model='infMkbDate'
                :disabled='request.regPlaceId === 2'
                placeholder='Укажите дату'
                format='dd.MM.yyyy'
                value-format='dd.MM.yyyy'
              )

          el-col(:span='12')
            el-form-item(label='Номер Заявки размещения договора управления в ГИС ЖКХ')
              el-input(v-model='infMkbRequestNum' :maxlength='9' :disabled='request.regPlaceId === 2')
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { mutationTypes } from '@/store/types/request'

const moduleName = 'request'
export default {
  name: 'RequestMainBuildingContract',
  props: {
    disabledEditing: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      request: (state) => state.request.request
    }),

    infMkbNum: {
      get() {
        return this.request.infMkbNum
      },
      set(value) {
        this.set({ propName: 'infMkbNum', propValue: value })
      }
    },

    infMkbDate: {
      get() {
        return this.request.infMkbDate
      },
      set(value) {
        this.set({ propName: 'infMkbDate', propValue: value })
      }
    },

    infMkbRequestNum: {
      get() {
        return this.request.infMkbRequestNum
      },
      set(value) {
        this.set({ propName: 'infMkbRequestNum', propValue: value })
      }
    }
  },
  methods: {
    showBlock() {
      return !(this.request.typeId === 10 && this.request.isTsgRepr === 'Y')
    },
    ...mapMutations(moduleName, {
      set: mutationTypes.SET_PROP
    })
  }
}
</script>
<style lang="sass"></style>
