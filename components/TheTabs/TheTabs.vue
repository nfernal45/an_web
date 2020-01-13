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
import { mapState, mapGetters } from 'vuex'
import styles from './TheTabs.module.sass?module'
import { getterTypes as referencesGetterTypes } from '@/store/types/references'
import { getterTypes as requestGettersTypes } from '@/store/types/request'

const requestModuleName = 'request'
const referencesModuleName = 'references'

export default {
  name: 'TheTabs',
  data() {
    return {
      tabs: [],
      initialTabs: [
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
    ...mapState(requestModuleName, {
      request: (state) => state.request
    }),

    ...mapGetters(requestModuleName, {
      requestPagesActiveStatuses:
        requestGettersTypes.GET_REQUEST_PAGES_ACTIVE_STATUSES
    }),

    ...mapState(referencesModuleName, {
      requestStatusesOptions: (state) => state.requestStatusesOptions
    }),

    ...mapGetters(referencesModuleName, {
      requestStatusesConstants:
        referencesGetterTypes.GET_REQUEST_STATUSES_OPTIONS_CONSTANTS
    }),

    regnum() {
      return this.request.regnum || 'Номер не назначен'
    },

    licenseeFullname() {
      return (
        this.request.licenseeFullname ||
        this.request.licenseeShortname ||
        'Название не указано'
      )
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
      const activeTabs = this.initialTabs.map((tab) => {
        function setActiveStatuses(tab, activeStatusesArray) {
          if (activeStatusesArray) tab.activeStatuses = activeStatusesArray
        }
        setActiveStatuses(tab, this.requestPagesActiveStatuses[tab.link])
        return tab
      })

      return activeTabs
        .filter((tab) => {
          return (
            !tab.activeStatuses ||
            tab.activeStatuses.includes(this.request.requestStatusId)
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
