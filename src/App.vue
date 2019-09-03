<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('autoLogin')
  },
  components: {
    FooterGuide
  }
}
</script>

<style>
</style>

