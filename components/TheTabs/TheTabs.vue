<template lang="pug">
  div
    div(:class="styles.title")
      span Заявление Рег. №: {{ regnum }}
    el-button-group(:class="styles.tabs")
      // el-button(v-for="(tab, index) in tabsComputed" :key="index" type="primary" plain)
      nuxt-link.el-button.el-button--primary.is-plain(
        v-for="(tab, index) in tabsComputed"
        :key="index"
        :class="styles['tab-link']"
        :to="tab.link") {{ tab.title }}
</template>
<script>
import styles from './TheTabs.module.sass?module'

export default {
  name: 'TheTabs',
  data() {
    return {
      appealStatus: 1,
      regnum: 'МЖИ-05-ХХ-ХХХХ/YY',
      tabs: [
        {
          title: 'Заявление',
          link: `main`
        },
        {
          title: 'Документы заявления',
          link: `attached-docs`
        },
        {
          title: 'МВ запросы',
          link: 'queried-docs'
        },
        {
          title: 'Приостановление',
          link: 'abeyance'
        },
        {
          title: 'Ход рассмотрения',
          link: 'doc-check'
        },
        {
          title: 'Решение по заявлению',
          link: 'decision'
        }
      ]
    }
  },
  computed: {
    styles() {
      return styles
    },
    appealId() {
      return 1
    },
    tabsComputed() {
      return this.tabs
        .filter((tab) => {
          return (
            !tab.activeStatus || tab.activeStatus.includes(this.appealStatus)
          )
        })
        .map((tab) => ({
          title: tab.title,
          link: (tab.link = `/appeal/${this.appealId}/${tab.link}`)
        }))
    }
  }
}
</script>
<style lang="sass"></style>
