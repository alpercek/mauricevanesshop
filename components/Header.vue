<template>
  <div>
    <img src="../static/cart.png" class="hidden"/>
  <div class="px-2.5 py-2 md:p-5">
    <div class="flex flex-wrap items-start justify-between md:gap-x-10 gap-y-3 leading-none">
      <NuxtLink to="/" class="text-xl md:text-2xl !no-underline font-platform text-[#FF0000]">
        {{ $prismic.asText(settings.data.siteTitle) }}
      </NuxtLink>
      <nav>
        <div class="flex md:hidden gap-x-3">
          <NuxtLink to="/checkout" class="relative"><img src="../static/zcart.svg" class="w-7 h-7"/><span class="counter text-[7px] absolute top-1/2 -translate-y-3/4 left-1/2 pb-[0.1rem]">0</span></NuxtLink>
        <div @click="sshowMobileMenu = !sshowMobileMenu" class="space-y-1 pt-1">
          <div class="w-6 h-[3px] bg-black rounded-full"></div>
          <div class="w-6 h-[3px] bg-black rounded-full"></div>
          <div class="w-6 h-[3px] bg-black rounded-full"></div>
        </div>
      </div>


        <ul class="flex flex-wrap gap-3 pr-3 hidden md:flex">
          <li
            v-for="item in navigation.data.links"
            :key="$prismic.asText(item.label)"
            class="tracking-[-0.02em] text-slate-800 font-garamond text-base"
          >
            <PrismicLink v-if="$prismic.asText(item.label) != 'Home'" :field="item.link">
              {{ $prismic.asText(item.label) }}
            </PrismicLink>
            <span v-if="$prismic.asText(item.label) == 'Shopping Cart'">(<span class="counter">0</span>)</span>
          </li>
        </ul>
      </nav>
    </div>
    <ul @click="sshowMobileMenu = !sshowMobileMenu" :class="{ active: sshowMobileMenu}" class="text-center md:hidden text-2xl h-screen w-screen max-h-0 bg-white/[0.88] transition-all overflow-hidden left-0 absolute top-[44px] z-10 pt-0">
          <li
            v-for="item in navigation.data.links"
            :key="$prismic.asText(item.label)"
            class="tracking-tight text-slate-800 font-cooperbt pt-7"
          >
            <PrismicLink v-if="$prismic.asText(item.label) != 'Shopping Cart'" :field="item.link">
              {{ $prismic.asText(item.label) }}
            </PrismicLink>
          </li>
        </ul>
      </div>
      <vue-marquee-slider
        v-if="settings.data.marquee[0]"
      class="lg:w-[17rem] w-screen text-[#FF0000] text-base font-cooperbt lg:absolute top-[1.25rem] left-1/2 lg:-translate-x-1/2 hidden"
      id="marquee-slider-text"
      :speed="settings.data.marquee[0].text.length*220" 
      :width="settings.data.marquee[0].text.length*10">
        <div>{{ settings.data.marquee[0].text }}</div>
      </vue-marquee-slider>
      </div>
</template>

<script>
import Vue from 'vue'
import VueMarqueeSlider from 'vue-marquee-slider'
Vue.use(VueMarqueeSlider)
export default {
  data(){
    return{
    sshowMobileMenu: false,
  }
  },
  props: {
    navigation: {
      type: Object,
      required: true
    },
    settings: {
      type: Object,
      required: true
    }
  },
  mounted(){
    if(localStorage.orders){
      const targetorders = JSON.parse(localStorage.orders)
      document.getElementsByClassName('counter')[0].innerText = targetorders.length
      document.getElementsByClassName('counter')[1].innerText = targetorders.length
    }
  },
}
</script>
<style>
.active{
  padding-top: 1.25rem;
  max-height: 99rem;
}
</style>
