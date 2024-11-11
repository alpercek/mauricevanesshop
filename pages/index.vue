<template>
  <div class="pb-5">
  <div class="pb-32">
    <div v-if="page.results[0].data.slices[0]">
      <!--mobile slider-->
      <template v-if="isMobile && page.results[0].data.slices[2]">
    <div class="relative md:w-[56vw] m-auto">
      <NuxtLink :to="'/'+page.results[0].uid">
    <VueSlickCarousel ref="carousel" :arrows="false" :adaptiveHeight="true" :autoplaySpeed="5000" :speed="1500" :autoplay="true">
    <div v-for="(item, i) in page.results[0].data.slices[2].items" :key="`slice-item-${i}`" class="m-auto pt-1.5">    
      <div class="relative"><PrismicImage :field="item.image" class="md:m-auto h-[62vh] md:h-[75vh] object-cover md:object-scale-down w-full"/><div v-if="page.results[0].data.status != 'ORDER'" :class="page.results[0].data.status == 'email'?'':'preorder'" class="absolute inset-0 backdrop-blur bg-white/60 flex justify-center items-center text-2xl font-cooperbt text-[#6200FF]"><div v-if="page.results[0].data.status == 'email'" class="opacity-60">「out of stock」</div><div v-else-if="page.results[0].data.status == 'PRE-ORDER' || item.data.status == 'customize'" class="opacity-60">「{{ page.results[0].data.purple_text[0].text }}」</div></div></div>
    </div>
  </VueSlickCarousel>
</NuxtLink>
  <div v-if="page.results[0].data.slices[0].items.length > 1" class="hidden md:flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2"> <button @click="showPrev" class="hidden md:block"><i class="arrow left"></i></button><button @click="showNext" class="hidden md:block"><i class="arrow right"></i></button></div>
</div>
</template>
<!-- slider-->
<template v-else >
<div class="relative md:w-[56vw] m-auto">
  <NuxtLink :to="'/'+page.results[0].uid">
<VueSlickCarousel ref="carousel" :arrows="false" :adaptiveHeight="true" :autoplaySpeed="5000" :speed="1500" :autoplay="true">
<div v-for="(item, i) in page.results[0].data.slices[0].items" :key="`slice-item-${i}`" class="m-auto pt-1.5">    
  <div class="relative"><PrismicImage :field="item.image" class="md:m-auto h-[62vh] md:h-[75vh] object-cover md:object-scale-down w-full"/><div v-if="page.results[0].data.status != 'ORDER'" :class="page.results[0].data.status == 'email'?'':'preorder'" class="absolute inset-0 backdrop-blur bg-white/60 flex justify-center items-center text-2xl font-cooperbt text-[#6200FF]"><div v-if="page.results[0].data.status == 'email'" class="opacity-60">「out of stock」</div><div v-else-if="page.results[0].data.status == 'PRE-ORDER'|| item.data.status == 'customize'" class="opacity-60">「{{ page.results[0].data.purple_text[0].text }}」</div></div></div>
</div>
</VueSlickCarousel>
</NuxtLink>
<div v-if="page.results[0].data.slices[0].items.length > 1" class="hidden md:flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2"> <button @click="showPrev" class="hidden md:block"><i class="arrow left"></i></button><button @click="showNext" class="hidden md:block"><i class="arrow right"></i></button></div>
</div>
</template>
<!--end-->
<div class="md:pb-36">
  <NuxtLink :to="'/'+page.results[0].uid">
  <div :style="{'color':page.results[0].data.color}" class="flex justify-center pt-2.5 md:pt-5 font-cooperbt text-xl items-center gap-0.5"><div :style="{'background-color':page.results[0].data.color}" class="rounded-full w-6 h-6 text-white flex justify-center items-center">{{ page.results[0].data.number }}</div><prismic-rich-text :field="page.results[0].data.title" class="" /></div>
  <div class="text-center font-garamond hidden md:block w-[33rem] m-auto" ><prismic-rich-text v-if="page.results[0].data.description.text" :field="page.results[0].data.description" class="pt-8" />
  <prismic-rich-text v-if="page.results[0].data.extra_line.text" :field="page.results[0].data.extra_line" class="italic pt-5" />
  <div v-if="page.results[0].data.price > 0" class="italic pt-5">€{{ page.results[0].data.price }},–</div></div>
  </NuxtLink>
</div>
</div>
  <div class="md:grid grid-cols-3 md:px-[7vw] gap-x-8 gap-y-12 max-w-[2000px]">
    <div v-for="(item, i) in page.results" :key="`slice-item-${i}`" class="pt-9 md:pt-0" v-if="i != 0">
    <NuxtLink :to="'/'+item.uid">
    <div class="relative"><PrismicImage :field="item.data.image" class="h-[62vh] md:h-[38.5vw] w-full md:border object-cover"/><div v-if="item.data.status != 'ORDER'" :class="item.data.status == 'email'?'':'preorder'" class="absolute inset-0 backdrop-blur bg-white/60 flex justify-center items-center text-2xl font-cooperbt text-[#6200FF]"><div v-if="item.data.status == 'email'" class="opacity-60">「out of stock」</div><div v-else-if="item.data.status == 'PRE-ORDER' || item.data.status == 'customize' " class="opacity-60">「{{ item.data.purple_text[0].text }}」</div></div></div>
    <div :style="{'color':item.data.color}" class="flex justify-center pt-4 md:pt-5 font-cooperbt text-xl items-center gap-0.5"><span><div :style="{'background-color':item.data.color}" class="rounded-full w-6 h-6 text-white flex justify-center items-center">{{ item.data.number }}</div></span><prismic-rich-text :field="item.data.title"/></div>
    </NuxtLink>
  </div>
</div>
</div>
<div v-if="settings.data.faqpdf.link_type == 'Media'" class="m-auto text-center"><a :href="settings.data.faqpdf.url" target="_blank" class="font-garamond text-2xl italic">FAQ</a></div>
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
    return { components, 
      window: {
            width: 0,
            height: 0
            },
      isMobile: false,
    }
    
  },
  computed: {
    settings() {
      return this.$store.state.prismic.settings
    }
  },
  mounted(){
  window.addEventListener('resize', this.handleResize);
        this.handleResize();
},
beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
  methods: {
      showNext() {
        this.$refs.carousel.next()
        
      },
      showPrev() {
        
        this.$refs.carousel.prev()
      },
      handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
            if (window.innerWidth < 640 || window.innerHeight < 640 ) {
                this.isMobile = true
            } else { this.isMobile = false }
        }
    },
  head () {
    return {
      title: 'SCANNEDFOOTBALLPHOTOS'
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