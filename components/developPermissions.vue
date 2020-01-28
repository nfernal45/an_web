<template lang="pug">
  div.container(v-if='permissionDisplayIsVisible')
    div.item(
      v-for='item in permissionControls'
      :ref='`item-${item}`'
      :class='{ ["active-item"]: activeItem(item) }'
      @click='setPerm(item)'
    ) {{ item }}
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'EmptyLayout',
  data() {
    return {
      isReady: false
    }
  },
  computed: {
    ...mapState([
      'permissions',
      'permissionControls',
      'permissionDisplayIsVisible'
    ]),
    // ...mapGetters('can', 'canAny'),
    activeItem() {
      return (item = '') => this.permissions.includes(item)
    }
  },
  mounted() {
    console.log(Array.isArray(this.permissions))
  },
  methods: {
    ...mapMutations({
      setPerm: 'setPermission',
      setAllPerms: 'setAllPermsissions'
    })
  }
}
</script>
<style lang="sass" scoped>
.container
  position: fixed
  // padding: 10px 12px
  top: 60%
  left: 0%
  border-radius: 2px
  background-color: rgba(47, 47, 47, 1)
  font-size: 10px
  letter-spacing: 1px

  .item
    padding: 5px 7px
    color: white
    cursor: pointer
    user-select: none
    &:hover
      background-color: rgba(40, 40, 40, 1)
    &:active
      background-color: rgba(35, 35, 35, 1)

  .active-item
    color: rgb(66, 245, 141) !important
</style>
