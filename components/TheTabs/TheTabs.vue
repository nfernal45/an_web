<template lang="pug">
  div
    div(:class="styles.title")
      div
        strong Заявление Рег. №: 
        span {{ regnum }}

      div
        strong Заявитель:
        span {{ licenseeFullname }}

      div
        strong Статус:
        span {{ appealStatusLabel }}

    el-button-group(:class="styles.tabs")
      nuxt-link.el-button(
        :class="tabLinkClass(tab.link)"
        v-for="(tab, index) in tabsComputed" :key="index"
        :to="tab.link"
        no-prefetch) {{ tab.title }}
</template>
<script>
import styles from './TheTabs.module.sass?module'

export default {
  name: 'TheTabs',
  data() {
    return {
      appealStatus: 1,
      regnum: 'МЖИ-05-ХХ-ХХХХ/YY',
      licenseeFullname: 'Товарищество собственников жилья «Снежная 23»',
      appealStatusLabel: 'На рассмотрении',
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
          link: 'suspension'
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
  },
  methods: {
    tabLinkClass(link) {
      return {
        [this.styles['tab-link']]: true,
        [this.styles.active]: this.isRouteActive(link)
      }
    },
    isRouteActive(link) {
      if (this.$nuxt.$route.path === link) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="sass"></style>
