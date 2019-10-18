<template lang="pug">
  el-aside(width="200px" :class="styles.aside")
    ul(:class="styles['list']")
      li(:class="styles['list-item']")
        nuxt-link(to="/registry")
          el-button(type="primary" :class="styles['list-button']")
            font-awesome-icon(icon="reply")
            span Назад к списку
      li(:class="styles['list-item']")
        el-button(type="success" :class="styles['list-button']" @click="saveAppeal()")
          font-awesome-icon(icon="save")
          span Сохранить
      li(:class="styles['list-item']")
        el-button(type="primary" plain :class="styles['list-button']" @click="print()")
          font-awesome-icon(icon="print")
          span Печать

    ul(:class="styles['list']")
      li(v-for="(button, index) in statusChangeButtonsComputed" :key="index" :class="styles['list-item']")
        el-button(type="warning" plain :class="styles['list-button']" @click="changeStatus()") {{ button.title }}

</template>
<script>
import { mapActions } from 'vuex'
import styles from './TheAside.module.sass?module'
import { actionTypes as appealActionTypes } from '@/store/types/appeal'

export default {
  name: 'TheAside',
  data() {
    return {
      appealStatus: 1,
      statusChangeButtons: [
        {
          title: 'На рассмотрение',
          activeStatuses: [1],
          changeStatus: [2]
        },
        {
          activeStatuses: [1],
          title: 'Запросить документы',
          changeStatus: [3]
        },
        {
          title: 'Сведения получены',
          activeStatuses: [1],
          changeStatus: [3]
        }
      ]
    }
  },
  computed: {
    styles() {
      return styles
    },
    statusChangeButtonsComputed() {
      return this.statusChangeButtons.filter((button) =>
        button.activeStatuses.includes(this.appealStatus)
      )
    }
  },
  methods: {
    ...mapActions({
      saveAppeal: `appeal/${appealActionTypes.SAVE_APPEAL}`
    }),
    print() {
      alert('Функционал находится в разработке')
    },
    changeStatus() {
      alert('Функционал находится в разработке')
    }
  }
}
</script>
