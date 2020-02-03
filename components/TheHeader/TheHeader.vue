<template lang="pug">
  el-header(:class="styles.header" height="80px")
    el-container
      div(class="flex align-center width-100")
        img(src="@/assets/img/logo.png" :class="styles.logo")
        h3(:class="styles.title") {{ title }}
        div(:class="styles.buttons")
          el-popover(
            placement="top"
          )
            font-awesome-icon(
              v-if='can("RL_GF_ENTER_GU")'
              slot="reference"
              icon="link"
              transform="shrink-3"
              size="2x"
              title="Переключение между модулями"
            )
            ul(:class='styles["links-list"]')
              li(v-for='(link, index) in links' :key='index')
                a(:href='link.href') {{ link.title }}
          font-awesome-icon(icon="user" transform="shrink-3" size="2x" title="Мои настройки" @click="userSettings()")
          font-awesome-icon(
            v-show='can("RL_GF_READONLY")'
            icon="sign-out-alt" size="2x" 
            title="Выйти из системы" 
            @click="logout()"
          )
</template>
<script>
import { mapGetters } from 'vuex'
import styles from './TheHeader.module.sass?module'
import logout from '@/services/auth'

export default {
  name: 'TheHeader',
  data() {
    return {
      title:
        'Подсистема "Реестр сведений о лицензиатах" ЕИС МЖИ. Внесение изменений в Реестр лицензий',
      links: [
        {
          title:
            'Модуль «Регистрации и обработки заявлений на выдачу лицензии / Лицензионных дел»',
          href: process.env.APP_HOST
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['can', 'canAny']),
    styles() {
      return styles
    }
  },
  methods: {
    userSettings() {
      this.$emit('userSettings')
      alert('Функционал в разработке')
    },
    logout() {
      this.$confirm('Выйти из системы?', 'Выход', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
        type: 'primary'
      }).then(() => {
        logout({
          authModule: this.$auth,
          axiosModule: this.$axios,
          baseRoute: this.$router.options.base,
          currentRoute: this.$route.path
        })
      })
    }
  }
}
</script>
