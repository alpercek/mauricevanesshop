<template>
  <div class="p-5">
    <div class="flex flex-wrap items-start justify-between gap-x-10 gap-y-3 leading-none">
      <NuxtLink to="/" class="text-2xl !no-underline font-platform">
        {{ $prismic.asText(settings.data.siteTitle) }}
      </NuxtLink>
      
      <nav>
        <div @click="sshowMobileMenu = !sshowMobileMenu" class="space-y-2 block md:hidden">
          <div class="w-8 h-0.5 bg-gray-600"></div>
          <div class="w-8 h-0.5 bg-gray-600"></div>
          <div class="w-8 h-0.5 bg-gray-600"></div>
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
    <ul :class="{ active: sshowMobileMenu}" class="gap-4 md:gap-10 md:hidden flex justify-center text-2xl h-0 mt-0 transition-all overflow-hidden">
          <li
            v-for="item in navigation.data.links"
            :key="$prismic.asText(item.label)"
            class="tracking-tight text-slate-800 font-garamond"
          >
            <PrismicLink :field="item.link">
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
  height: 3rem;
  margin-top: 20px;
}
</style>
