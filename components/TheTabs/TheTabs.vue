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
const moduleName = 'request'
export default {
  name: 'TheTabs',
  data() {
    return {
      requestStatusesOptions: [],
      requestStatusesConstants: [],
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
    ...mapState(moduleName, {
      request: (state) => state.request
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
          tab.activeStatuses = activeStatusesArray
        }

        switch (tab.link) {
          case 'queried-docs':
            setActiveStatuses(tab, [
              this.requestStatusesConstants.REGISTERED,
              this.requestStatusesConstants.DOCSQUERIED,
              this.requestStatusesConstants.INFORMATIONRECEIVED,
              this.requestStatusesConstants.REVIEW,
              this.requestStatusesConstants.DECISIONPREPARING,
              this.requestStatusesConstants.DECISIONMADE,
              this.requestStatusesConstants.NOTICEPREPARING,
              this.requestStatusesConstants.VIOLATIONELIMINATION,
              this.requestStatusesConstants.RESUMED,
              this.requestStatusesConstants.DOCSQUERIED2,
              this.requestStatusesConstants.INFORMATIONRECEIVED2
            ])
            break

          case 'abeyance':
            if (
              this.request.gfAbeyancesByRequestId &&
              this.request.gfAbeyancesByRequestId.length
            ) {
              setActiveStatuses(tab, [
                this.requestStatusesConstants.REVIEW,
                this.requestStatusesConstants.DECISIONPREPARING,
                this.requestStatusesConstants.DECISIONMADE,
                this.requestStatusesConstants.NOTICEPREPARING,
                this.requestStatusesConstants.VIOLATIONELIMINATION,
                this.requestStatusesConstants.RESUMED,
                this.requestStatusesConstants.DOCSQUERIED2,
                this.requestStatusesConstants.INFORMATIONRECEIVED2
              ])
            } else {
              setActiveStatuses(tab, [
                this.requestStatusesConstants.NOTICEPREPARING
              ])
            }

            break

          case 'doc-check':
            setActiveStatuses(tab, [
              this.requestStatusesConstants.REGISTERED,
              this.requestStatusesConstants.DOCSQUERIED,
              this.requestStatusesConstants.INFORMATIONRECEIVED,
              this.requestStatusesConstants.REVIEW,
              this.requestStatusesConstants.DECISIONPREPARING,
              this.requestStatusesConstants.DECISIONMADE,
              this.requestStatusesConstants.NOTICEPREPARING,
              this.requestStatusesConstants.VIOLATIONELIMINATION,
              this.requestStatusesConstants.RESUMED,
              this.requestStatusesConstants.DOCSQUERIED2,
              this.requestStatusesConstants.INFORMATIONRECEIVED2
            ])

            break

          case 'decision':
            setActiveStatuses(tab, [
              this.requestStatusesConstants.REVIEW,
              this.requestStatusesConstants.DECISIONPREPARING,
              this.requestStatusesConstants.DECISIONMADE,
              this.requestStatusesConstants.NOTICEPREPARING,
              this.requestStatusesConstants.VIOLATIONELIMINATION,
              this.requestStatusesConstants.RESUMED,
              this.requestStatusesConstants.DOCSQUERIED2,
              this.requestStatusesConstants.INFORMATIONRECEIVED2
            ])

            break
        }

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

      this.requestStatusesConstants = this.requestStatusesOptions.reduce(
        (result, item, index, array) => {
          result[item.statusShortName] = item.statusId
          return result
        },
        {}
      )
    }
  }
}
</script>
<style lang="sass"></style>
