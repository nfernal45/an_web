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
          link: 'main',
          permsissions: [
            'RL_GF_READONLY',
            'RL_GF_REQUEST_CREATE',
            'RL_GF_REQUEST_REGISTER'
          ]
        },
        {
          title: 'Документы заявления',
          link: 'attached-docs',
          permsissions: ['RL_GF_READONLY']
        },
        {
          title: 'МВ запросы',
          link: 'queried-docs',
          permsissions: ['RL_GF_READONLY', 'RL_GF_QUERY']
        },
        {
          title: 'Приостановление',
          link: 'abeyance',
          permsissions: ['RL_GF_ABEYANCE_PREPARING', 'RL_GF_ABEYANCE_APPROVAL']
        },
        {
          title: 'Ход рассмотрения',
          link: 'doc-check',
          permsissions: ['RL_GF_READONLY', 'RL_GF_DOC_CHECK_EDIT']
        },
        {
          title: 'Решение по заявлению',
          link: 'decision',
          permsissions: [
            'RL_GF_READONLY',
            'RL_GF_DECISION_PREPARING',
            'RL_GF_DECISION_APPROVAL'
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['can', 'canAny']),
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

      const permittedTabs = activeTabs.filter((tab) => {
        return this.canAny(tab.permsissions)
      })

      return permittedTabs
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
