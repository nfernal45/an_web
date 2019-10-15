<template lang="pug">
  div.flex.width-100.height-100vh.justify-center.align-center
    span Загрузка...
</template>
<script>
/* eslint-disable */
export default {
  name: 'LoginPage',
  layout: 'emptyLayout',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.login()
    })
  },
  methods: {
    login() {
      if (this.$route.query.code) return
      if (!this.$auth.loggedIn) this.$auth.loginWith('oauth2')
    }
  }
}
</script>
