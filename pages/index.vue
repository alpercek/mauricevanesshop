<template>
  <div class="pb-5">
  <div class="pb-32">
    <div v-if="page.results[0].data.slices[0]">
    <div class="relative md:w-[56vw] m-auto">
      <NuxtLink :to="'/'+page.results[0].uid">
    <VueSlickCarousel ref="carousel" :arrows="false" :adaptiveHeight="true" :autoplaySpeed="5000" :speed="1500" :autoplay="true">
    <div v-for="(item, i) in page.results[0].data.slices[0].items" :key="`slice-item-${i}`" class="m-auto pt-1.5">    
      <div class="relative"><PrismicImage :field="item.image" class="md:m-auto h-[62vh] md:h-[75vh] object-cover md:object-scale-down w-full"/><div v-if="page.results[0].data.status != 'ORDER'" :class="page.results[0].data.status == 'email'?'':'preorder'" class="absolute inset-0 backdrop-blur bg-white/60 flex justify-center items-center text-2xl font-cooperbt text-[#6200FF]"><div v-if="page.results[0].data.status == 'email'" class="opacity-60">「out of stock」</div><div v-if="page.results[0].data.status == 'PRE-ORDER'" class="opacity-60">「{{ page.results[0].data.purple_text[0].text }}」</div></div></div>
    </div>
  </VueSlickCarousel>
</NuxtLink>
  <div v-if="page.results[0].data.slices[0].items.length > 1" class="hidden md:flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2"> <button @click="showPrev" class="hidden md:block"><i class="arrow left"></i></button><button @click="showNext" class="hidden md:block"><i class="arrow right"></i></button></div>
</div>
<div class="md:pb-36">
  <NuxtLink :to="'/'+page.results[0].uid">
  <div :style="{'color':page.results[0].data.color}" class="flex justify-center pt-2.5 md:pt-5 font-cooperbt text-xl items-center gap-0.5"><div :style="{'background-color':page.results[0].data.color}" class="rounded-full w-6 h-6 text-white flex justify-center items-center">{{ page.results[0].data.number }}</div><prismic-rich-text :field="page.results[0].data.title" class="" /></div>
  <div class="text-center font-garamond hidden md:block w-[33rem] m-auto" ><prismic-rich-text v-if="page.results[0].data.description.text" :field="page.results[0].data.description" class="pt-8" />
  <prismic-rich-text v-if="page.results[0].data.extra_line.text" :field="page.results[0].data.extra_line" class="italic pt-5" />
  <div class="italic pt-5">€{{ page.results[0].data.price }},–</div></div>
  </NuxtLink>
</div>
</div>
  <div class="md:grid grid-cols-3 md:px-[7vw] gap-x-8 gap-y-12 max-w-[2000px]">
    <div v-for="(item, i) in page.results" :key="`slice-item-${i}`" class="pt-9 md:pt-0" v-if="i != 0">
    <NuxtLink :to="'/'+item.uid">
    <div class="relative"><PrismicImage :field="item.data.image" class="h-[62vh] md:h-[38.5vw] w-full md:border object-cover"/><div v-if="item.data.status != 'ORDER'" :class="item.data.status == 'email'?'':'preorder'" class="absolute inset-0 backdrop-blur bg-white/60 flex justify-center items-center text-2xl font-cooperbt text-[#6200FF]"><div v-if="item.data.status == 'email'" class="opacity-60">「out of stock」</div><div v-if="item.data.status == 'PRE-ORDER'" class="opacity-60">「{{ item.data.purple_text[0].text }}」</div></div></div>
    <div :style="{'color':item.data.color}" class="flex justify-center pt-4 md:pt-5 font-cooperbt text-xl items-center gap-0.5"><span><div :style="{'background-color':item.data.color}" class="rounded-full w-6 h-6 text-white flex justify-center items-center">{{ item.data.number }}</div></span><prismic-rich-text :field="item.data.title"/></div>
    </NuxtLink>
  </div>
</div>
</div>
<div v-if="settings.data.faqpdf.link_type == 'Media'" class="m-auto text-center"><a :href="settings.data.faqpdf.url" target="_blank" class="font-garamond text-2xl italic">FAQ</a></div>

<div v-if="sessionStorage.getItem("key")" id="alper" class="fixed w-screen h-screen bg-white z-10 transition-[bottom] ease-in duration-[2000ms] delay-[2000ms] overflow-hidden bottom-0">
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
</template>

<script>
import { components } from '~/slices'
import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  async asyncData ({ $prismic, store }) {
    const page = await $prismic.api.query(
      $prismic.predicates.at('document.type','product'),{
        orderings: '[my.product.uid, document.first_publication_date]'
      }
    )
    await store.dispatch('prismic/load')
    return {
      page
    }
  },
  data () {
    return { components, }
    
  },
  computed: {
    settings() {
      return this.$store.state.prismic.settings
    }
  },
  methods: {
      showNext() {
        this.$refs.carousel.next()
        
      },
      showPrev() {
        
        this.$refs.carousel.prev()
      },
    },
  head () {
    return {
      title: 'SCANNEDFOOTBALLPHOTOS'
    }
  },
  mounted() {
    const alper = document.getElementById('alper')
    if(alper){
    alper.style.bottom = '100vh'
    setTimeout(() => {
      alper.remove()
      document.getElementById('marquee-slider-text').style.display = 'block'
    }, 4000);
    sessionStorage.setItem("key", false)
  }
},
  name: 'MyComponent',
    components: { VueSlickCarousel },
}
</script>
<style>
.arrow {
  border: solid;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 6px;
  color: #c7c7c7;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
.preorder{
animation: pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>