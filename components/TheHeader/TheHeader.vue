<template lang="pug">
  el-header(:class="styles.header" height="80px")
    el-container
      div(class="flex align-center width-100")
        img(src="@/assets/img/logo.png" :class="styles.logo")
        h3(:class="styles.title") {{ title }}
        div(:class="styles.buttons")
          font-awesome-icon(icon="user" transform="shrink-3" size="2x" title="Мои настройки" @click="userSettings()")
          font-awesome-icon(icon="sign-out-alt" size="2x" title="Выйти из системы" @click="logout()")
</template>
<script>
import styles from './TheHeader.module.sass?module'

export default {
  name: 'TheHeader',
  data() {
    return {
      // TODO: взять значение из глобального head.title
      title: `Подсистема "Реестр сведений о лицензиатах"
        ЕИС МЖИ. Внесение изменений в реестр.`
    }
  },
  computed: {
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
        this.$auth.logout()
      })
    }
  }
}
</script>
