<template lang="pug">
  form-block(title='Документы заявителя')
    template(slot='content')
      ched-form(@upload='onUpload')
</template>
<script>
import { mapState } from 'vuex'
import ChedForm from '@/components/request/attachedDocs/chedForm'
const moduleName = 'request'
export default {
  name: 'AttachedDocsMzhiDocs',
  components: {
    ChedForm
  },
  computed: {
    ...mapState(moduleName, {
      attachedDocs: (state) => state.request.gfAttachedDocsByRequestId
    })
  },
  methods: {
    onUpload(data) {
      console.log('FILE', data)
    }
  }
}
</script>
<style lang="sass"></style>
