<template>
  <div class="pb-32">
    <div v-if="page.results[0].data.slices[0]">
    <div class="relative md:w-[56vw] m-auto">
      <NuxtLink :to="'/'+page.results[0].uid">
    <VueSlickCarousel ref="carousel" :arrows="false" :adaptiveHeight="true" :autoplaySpeed="5000" :autoplay="true">
    <div v-for="(item, i) in page.results[0].data.slices[0].items" :key="`slice-item-${i}`" class="m-auto pt-1.5">    
        <PrismicImage :field="item.image" class="md:m-auto h-[62vh] md:h-[43.5rem] object-cover md:object-scale-down w-full"/>
    </div>
  </VueSlickCarousel>
</NuxtLink>
  <div v-if="page.results[0].data.slices[0].items.length > 1" class="hidden md:flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2"> <button @click="showPrev" class="hidden md:block"><i class="arrow left"></i></button><button @click="showNext" class="hidden md:block"><i class="arrow right"></i></button></div>
</div>
<div class="md:pb-36">
  <NuxtLink :to="'/'+page.results[0].uid">
  <div :style="{'color':page.results[0].data.color}" class="flex justify-center pt-2.5 md:pt-5 font-cooperbt text-xl"><span v-if="page.results[0].uid == 0" class="text-2xl pr-1">⓿</span><span v-else class="text-2xl pr-1">{{ String.fromCharCode(	0x2775 + Number(page.results[0].uid)) }}</span><prismic-rich-text :field="page.results[0].data.title" class="" /></div>
  <div class="text-center font-garamond hidden md:block w-[33rem] m-auto"><prismic-rich-text :field="page.results[0].data.description" class="pt-8" />
  <prismic-rich-text :field="page.results[0].data.extra_line" class="italic pt-5" />
  <div class="italic pt-5">€{{ page.results[0].data.price }},–</div></div>
  </NuxtLink>
</div>
</div>
  <div class="md:grid grid-cols-3 md:px-[7vw] gap-x-4 gap-y-12">
    <div v-for="(item, i) in page.results" :key="`slice-item-${i}`" class="pt-9 md:pt-0" v-if="i != 0">
    <NuxtLink :to="'/'+item.uid">
    <PrismicImage :field="item.data.image" class="h-[62vh] md:h-[38.5vw] w-full md:border object-cover"/>
    <div :style="{'color':item.data.color}" class="flex justify-center pt-4 md:pt-5 font-cooperbt text-xl"><span class="text-2xl pr-1">{{ String.fromCharCode(	0x2775 + Number(item.uid)) }}</span><prismic-rich-text :field="item.data.title" class="" /></div>
    </NuxtLink>
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

</style>