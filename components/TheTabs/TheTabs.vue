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
        span {{ requestStatusName }}

    el-button-group(:class="styles.tabs")
      nuxt-link.el-button(
        :class="tabLinkClass(tab.link)"
        v-for="(tab, index) in tabsComputed" :key="index"
        :to="tab.link"
        no-prefetch) {{ tab.title }}
</template>
<script>
import { mapState } from 'vuex'
import styles from './TheTabs.module.sass?module'
import fetchRequestStatusesOptions from '@/services/api/references/fetchRequestStatusesOptions'

export default {
  name: 'TheTabs',
  data() {
    return {
      requestStatusesOptions: [],
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
    ...mapState({
      request: (state) => state.request.request
    }),

    regnum() {
      return this.request.regnum || 'Номер не назначен'
    },

    licenseeFullname() {
      return this.request.licenseeFullname || 'Название не указано'
    },

    requestStatusName() {
      return (
        (this.requestStatusesOptions.length &&
          this.request.requestStatusId &&
          this.requestStatusesOptions.find(
            (status) => status.statusId === this.request.requestStatusId
          ).statusName) ||
        'Новое заявление'
      )
    },

    styles() {
      return styles
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
  async mounted() {
    await this.fetchRequestStatusesOptions()
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
    },
    async fetchRequestStatusesOptions() {
      this.requestStatusesOptions = await fetchRequestStatusesOptions({
        axiosModule: this.$axios
      })
    }
  }
}
</script>
<style lang="sass"></style>
