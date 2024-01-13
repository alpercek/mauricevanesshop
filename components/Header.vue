<template>
  <div class="px-2.5 py-2 md:p-5">
    <div class="flex flex-wrap items-start justify-between md:gap-x-10 gap-y-3 leading-none">
      <NuxtLink to="/" class="text-xl md:text-2xl !no-underline font-platform">
        {{ $prismic.asText(settings.data.siteTitle) }}
      </NuxtLink>
      
      <nav>
        <div class="flex md:hidden gap-x-3">
          <NuxtLink to="/checkout"><img src="../static/cart.svg" class="w-5 h-5"/></NuxtLink>
        <div @click="sshowMobileMenu = !sshowMobileMenu" class="space-y-1 pt-1">
          <div class="w-5 h-0.5 bg-gray-600"></div>
          <div class="w-5 h-0.5 bg-gray-600"></div>
          <div class="w-5 h-0.5 bg-gray-600"></div>
        </div>
      </div>


        <ul class="flex flex-wrap gap-3 pr-3 hidden md:flex">
          <li
            v-for="item in navigation.data.links"
            :key="$prismic.asText(item.label)"
            class="tracking-tight text-slate-800 font-garamond text-xs"
          >
            <PrismicLink v-if="$prismic.asText(item.label) != 'Home'" :field="item.link">
              {{ $prismic.asText(item.label) }}
            </PrismicLink>
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
</template>

<script>
export default {
  data(){
    return{
    sshowMobileMenu: false}
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
  }
}
</script>
<style>
.active{
  padding-top: 1.25rem;
  max-height: 99rem;
}
</style>
