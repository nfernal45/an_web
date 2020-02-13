<template lang="pug">
  form-block.mb-10(title='Сведения о многоквартирном доме')
    template(slot='content')
      el-form(
        label-position='top' 
        size='small'
        :disabled='disabledEditing'
      )
        el-row(:gutter='20')
          el-col(:span='16')
            address-picker(:addressId = 'addressId' @selectAddress='selectAddress')
            el-form-item(label='Адрес МКД, указанный заявителем на МПГУ')
              el-input(:value="request.addressName" readonly)
            el-form-item(label='Тип номера')
              el-radio-group(v-model='numType')
                el-radio(
                  v-for='item in numTypeOptions'
                  :key='item.numTypeId'
                  :label='item.numTypeId'
                  style='margin-bottom: 5px'
                ) {{ item.numTypeName }}

          el-col(:span='8')
            el-form-item(label='Код БТИ')
              el-input(v-model='unom' :disabled='!!request.regPlaceId')
            el-form-item(label='Код ФИАС')
              el-input(v-model="fiasHouseguid" :disabled='!!request.regPlaceId')
            el-form-item(v-if="numType === 1" label='Кадастровый номер')
              el-input(v-model="cadNum")
            el-form-item(v-else label='Условный номер')
              el-input(v-model="condNum")
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
const moduleName = 'request'
export default {
  name: 'RequestMainBuildingInfo',
  props: {
    disabledEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      numTypeOptions: [
        {
          numTypeName: 'Кадастровый номер',
          numTypeId: 1
        },
        {
          numTypeName: 'Условный номер',
          numTypeId: 2
        }
      ]
    }
  },
  computed: {
    ...mapState({
      request: (state) => state.request.request
    }),

    fiasHouseguid: {
      get() {
        return this.request.fiasHouseguid
      },
      set(value) {
        this.set({ propName: 'fiasHouseguid', propValue: value })
      }
    },

    numType: {
      get() {
        return this.request.numType
      },
      set(value) {
        this.set({ propName: 'numType', propValue: value })
      }
    },

    unom: {
      get() {
        return this.request.unom
      },
      set(value) {
        this.set({ propName: 'unom', propValue: value })
      }
    },

    cadNum: {
      get() {
        return this.request.cadNum
      },
      set(value) {
        this.set({ propName: 'cadNum', propValue: value })
      }
    },

    condNum: {
      get() {
        return this.request.condNum
      },
      set(value) {
        this.set({ propName: 'condNum', propValue: value })
      }
    },

    addressId: {
      get() {
        return this.request.addressId
      },
      set(value) {
        this.set({ propName: 'addressId', propValue: value })
      }
    }
  },
  methods: {
    ...mapMutations(moduleName, {
      set: mutationTypes.SET_PROP
    }),
    selectAddress({ addressId, fiasHouseGuid, btiAddrId }) {
      this.addressId = addressId
      if (fiasHouseGuid) this.fiasHouseguid = fiasHouseGuid
      if (btiAddrId) this.unom = btiAddrId
    }
  }
}
</script>
<style lang="sass"></style>
