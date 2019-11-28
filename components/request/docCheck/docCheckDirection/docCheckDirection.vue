<template lang="pug">
  form-block.mb-10(title='Соответствие заявления и документов требованиям Порядка')
    template(slot='content')
      el-form(label-position='top' size='small')
        el-row(:gutter='20')
          //- el-col(:span='6')
          //-   el-form-item(label='Окружная инспекция')
          //-     el-select(v-model='deptId')
          //-       el-option(v-for='(item, index) in refDept'
          //-                 :key='index'
          //-                 :label='item.deptNameSht'
          //-                 :value='item.deptId') 
          el-col(:span='10')
            employee-picker(label='Ответственный исполнитель' v-model='performerId')
          
        
        //- el-row.mb-10(style='font-size: 12px')
        //-   strong Сведения о действующей лицензии по данным МЖИ: 
        //-   span  {{ licenseData.number }}
        //-   strong  от
        //-   span  {{ licenseData.date }} 
        //-   strong  Лицензионное дело 
        //-   span  {{ licenseData.id }}

</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { mutationTypes } from '@/store/types/request'
import fetchRefDept from '@/services/api/references/fetchRefDept'
const moduleName = 'request'
export default {
  name: 'DocCheckDirectionComponent',
  data() {
    return {
      refDept: [],
      employeeExecutor: ''
    }
  },
  computed: {
    ...mapState(moduleName, {
      docCheck: (state) => state.docCheck
    }),
    requestId() {
      return this.$route.params.id
    },
    deptId: {
      get() {
        return this.docCheck && this.docCheck.deptId
      },
      set(value) {
        this.setPropDocCheck({ propName: 'deptId', propValue: value })
      }
    },
    performerId: {
      get() {
        return this.docCheck && this.docCheck.performerId
      },
      set(value) {
        this.setPropDocCheck({ propName: 'performerId', propValue: value })
      }
    }
  },
  mounted() {
    this.fetchRefDept()
  },
  methods: {
    ...mapMutations(moduleName, {
      setPropDocCheck: mutationTypes.SET_PROP_DOC_CHECK
    }),
    async fetchRefDept() {
      this.refDept = await fetchRefDept({ axiosModule: this.$axios })
    }
  }
}
</script>
<style lang="sass"></style>
