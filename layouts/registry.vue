<template lang="pug">
  div.flex.justify-center.flex-wrap(v-show="isReady" style="background:#f8f8f8")
    the-header.header.sticky(style="flex: 1 0 0; position: sticky; top: 0;")
    el-container.flex-wrap(style="position: relative;")
      div.flex.width-100
        el-main(style="flex: 1 0 0;")
          nuxt

    //DEV
    develop-permissions
</template>

<script>
import TheHeader from '@/components/TheHeader'

// DEV
import developPermissions from '@/components/developPermissions'

export default {
  components: {
    TheHeader,

    // DEV
    developPermissions
  },
  data() {
    return {
      isReady: false
    }
  },
  mounted() {
    this.setStickyPolyfill()
    this.$nextTick(() => {
      this.isReady = true
    })
  },
  methods: {
    setStickyPolyfill() {
      if (process.client) {
        const Stickyfill = require('stickyfilljs')
        const stickyElements = document.querySelectorAll('.sticky')
        Stickyfill.add(stickyElements)
      }
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow-y: scroll;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.sticky-sidebar {
  will-change: min-height;
}

.sidebar__inner {
  transform: translate(0, 0); /* For browsers don't support translate3d. */
  transform: translate3d(0, 0, 0);
  will-change: position, transform;
}
</style>
