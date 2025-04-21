<template>
  <div class="text-slate-800">
    <Header
      v-if="navigation.data && settings.data"
      :navigation="navigation"
      :settings="settings"
    />
    <main><nuxt /></main>
    <div v-if="splash">
    <div v-if="event" id="alper" class="fixed w-screen h-screen bg-white z-10 transition-[bottom] ease-in duration-[2000ms] overflow-hidden bottom-0">
      <Maradona :settings="settings" @goToSite="animation()" />
    </div>
    <div v-else id="alper" class="pointer-events-none fixed opacity-0 w-screen h-screen bg-white z-10 transition-[bottom] ease-in duration-[2000ms] delay-[2000ms] overflow-hidden bottom-0">
      <div :style="{'color':settings.data.splashcolor}" class="absolute z-20 inset-0 flex items-center justify-center font-cooperbt flex-col p-5">
        <div class="px-2.5 py-2 md:p-5 fixed top-0 left-0 puff pointer-events-none">
          <div class="flex flex-wrap items-start justify-between md:gap-x-10 gap-y-3 leading-none">
            <div class="text-xl md:text-2xl !no-underline font-platform">
              {{ $prismic.asText(settings.data.siteTitle) }}
            </div>
          </div>
        </div>
        <prismic-rich-text :field="settings.data.splashtexttop" class="text-center"/>
        <prismic-rich-text :field="settings.data.splashnumber" class="text-center"/>
        <prismic-rich-text :field="settings.data.splashtextbottom" class="text-center"/>
      </div>
      <div class="absolute z-10">
        <PrismicImage :field="settings.data.splashimage" class="h-screen w-screen object-cover hidden md:block"/>
        <PrismicImage :field="settings.data.splashimagephone" class="h-screen w-screen object-cover md:hidden"/>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mounted: false,
      event: true
    }
  },
  computed: {
    navigation() {
      return this.$store.state.prismic.navigation
    },
    settings() {
      return this.$store.state.prismic.settings
    },
    splash() {
      if (this.$route.name == 'index' && this.mounted == false) {
        this.mounted = true
        return true
      }
      else {
        return false
      }
    }
  },
  mounted() {
    if (this.splash && !this.event) {
      this.animation()
    }
  },
  methods: {
    animation(){
      const alper = document.getElementById('alper')
    alper.style.opacity = '1'
    alper.style.bottom = '100vh'
    setTimeout(() => {
      alper.style.display = 'none'
      document.getElementById('marquee-slider-text').style.display = 'block'
      this.mounted = true
    }, 4000)
    }
  }
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
