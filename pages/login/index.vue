<template lang="pug">
  div.flex.width-100.height-100vh.justify-center.align-center
    div(v-if="isCodeReceived") Загрузка...
    div(v-else :class="styles['login-box']")
      img(:class="styles['login-logo']" src="@/assets/img/logo180.png" alt='Московская жилищная инспекция')
      h1(:class="styles['login-header']") Государственная жилищная инспекция города Москвы
      el-button(v-show="!isCodeReceived" @click="login" type="primary") Войти
</template>
<script>
import styles from './loginPage.module.sass?module'
import { setLastTokenDate } from '@/services/helpers/auth/userSession'

/* eslint-disable */
export default {
  name: 'LoginPage',
  layout: 'emptyLayout',
  data() {
    return {
      loading: true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$auth.loggedIn) vm.$router.push(from.path)
      if (vm.$route.query.code) return
    })
  },
  computed: {
    styles() {
      return styles
    },
    isCodeReceived() {
      return this.$route.query.code
    },
    isLoggedIn() {
      return this.$auth.loggedIn
    }
  },
  methods: {
    login() {
      try {
        this.$auth.loginWith('oauth2').then(() => {
          setLastTokenDate()
        })
      } catch(error) {
        redirect('/login')
      }
    }
  }
}
</script>
