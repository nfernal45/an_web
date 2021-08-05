<template lang="pug">
  el-dialog(
    :visible.sync='isDialogOpen'
    :close-on-click-modal='false'
    :modal-append-to-body='false'
    :title='title'
    @closed='closeDialog'
  )
    p(v-if='!computedRefViolationsDescriptions.length' style="font-size: 20px") Для проверки данных пунктов Порядка справочник нарушений не предусмотрен
    el-checkbox-group.justify-start.align-start.violations-checkbox-group(v-else v-model='selectedViolations')
      el-checkbox(
        v-for="violation in computedRefViolationsDescriptions"
        :key='violation.id'
        :label='violation.name') {{ violation.name }}
    div(slot='footer' class='dialog-footer')
      el-button(@click='confirmSelection' type='primary' v-if='computedRefViolationsDescriptions.length') Выбрать
      el-button(@click='cancelSelection') Отменить

</template>
<script>
import fetchViloatioinsDescriptions from '@/services/api/references/fetchViloatioinsDescriptions'

export default {
  name: 'DocCheckViolationsDescriptionsDialog',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    refViolationGroupId: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: 'Справочник нарушений'
    }
  },
  data() {
    return {
      refViolationsDescriptions: [],
      selectedViolations: []
    }
  },
  computed: {
    isDialogOpen: {
      get() {
        return this.isVisible
      },
      set(value) {
        this.$emit('update:isVisible', value)
      }
    },
    computedRefViolationsDescriptions() {
      return this.refViolationsDescriptions.filter(
        (violation) =>
          violation.refViolationGroupByGroupId.id === this.refViolationGroupId
      )
    }
  },
  mounted() {
    this.fetchViloatioinsDescriptions()
  },
  methods: {
    closeDialog() {
      this.selectedViolations = []
      this.$emit('close')
    },
    confirmSelection() {
      this.$emit('select', this.selectedViolations)
      this.isDialogOpen = false
    },
    cancelSelection() {
      this.$emit('select', null)
      this.isDialogOpen = false
    },
    async fetchViloatioinsDescriptions() {
      if (this.refViolationsDescriptions.length) return
      this.refViolationsDescriptions = await fetchViloatioinsDescriptions({
        axiosModule: this.$axios
      })
    }
  }
}
</script>
<style lang="sass">
.violations-checkbox-group
  height: 400px
  border: 1px solid #e6e6e6
  padding: 10px
  overflow-x: hidden
  scroll-x: auto
  .el-checkbox__label
    word-break: normal
</style>
