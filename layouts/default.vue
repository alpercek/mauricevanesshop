<template>
  <div class="text-slate-800">
    <Header
      v-if="navigation.data && settings.data"
      :navigation="navigation"
      :settings="settings"
    />
    <main><nuxt /></main>
  </div>
</template>

<script>
export default {
  computed: {
    navigation() {
      return this.$store.state.prismic.navigation
    },
    settings() {
      return this.$store.state.prismic.settings
    }
  },
}
</script>

<style>
body {
  @apply overflow-x-hidden antialiased;
}
.puff {
  animation-name: puff;
  animation-duration: 1s;
  animation-delay: 5s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
}
@keyframes puff {
  from {opacity: 1;}
  to {opacity: 0;}
}
</style>
