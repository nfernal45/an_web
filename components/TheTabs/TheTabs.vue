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
        span {{ requestStatusLabel }}

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
      requestStatus: 1,
      regnum: 'МЖИ-05-ХХ-ХХХХ/YY',
      licenseeFullname: 'Товарищество собственников жилья «Снежная 23»',
      requestStatusLabel: 'На рассмотрении',
      tabs: [
        {
          title: 'Заявление',
          link: 'main'
        },
        {
          title: 'Документы заявления',
          link: 'attached-docs'
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
    requestId() {
      return 1
    },
    tabsComputed() {
      return this.tabs
        .filter((tab) => {
          return (
            !tab.activeStatus || tab.activeStatus.includes(this.requestStatus)
          )
        })
        .map((tab) => ({
          title: tab.title,
          link: `/request/${this.$route.params.id}/${tab.link}`
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
