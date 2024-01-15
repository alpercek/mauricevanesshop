<template>
  <div class="relative pb-32">
    <!-- slider -->
    <div v-if="page.data.slices[0]" class="pb-5">
  <div class="relative md:w-[56vw] m-auto">
   <VueSlickCarousel ref="carousel" :arrows="false" :adaptiveHeight="true" :dots="true" :autoplaySpeed="speed" :autoplay="true" >
    <template #customPaging="page">
      <div class="custom-dot !font-normal text-lg asd">
        {{ String.fromCharCode(	0x2160 + page) }}
      </div>
    </template>
      <div v-for="(item, i) in page.data.slices[0].items" :key="`slice-item-${i}`" class="m-auto pt-1.5">    
          <PrismicImage :field="item.image" class="md:m-auto h-[62vh] md:h-[37.5rem] object-cover md:object-scale-down w-full"/>
        </div>
        <div v-if="video.url" class="m-auto pt-1.5 relative">
        <video onclick="this.play(); this.nextElementSibling.remove()" type="video/mp4" playsinline id="vd" :src="video.url" class="md:m-auto h-[62vh] md:h-[37.5rem] object-cover md:object-scale-down w-full cursor-pointer"></video>
        <div class="pointer-events-none absolute top-3/4 left-1/2 -translate-x-1/2 text-2xl bg-white px-1.5 rounded-full font-metrik">click to play &#x23F5;</div>
      </div>
    </VueSlickCarousel>
    <div v-if="page.data.slices[0].items.length > 1" class="md:flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2 hidden"> <button @click="showPrev" class="hidden md:block"><i class="arrow left"></i></button><button @click="showNext" class="hidden md:block"><i class="arrow right"></i></button></div>
  </div>
</div>
<!-- rest -->
    <div>
      <div class="md:ml-[43vw] mt-14 md:mt-0">
    <prismic-rich-text :field="page.data.description" class="font-garamond text-sm w-[25rem] pl-4 md:pl-0" />
<!-- bookinfo-->
<table v-if="page.data.slices[1]" class="font-cooperbt text-left tracking-[-0.01em] text-xs ml-7 md:ml-0 mt-9 md:mt-7">
      <tbody>
      <tr>
        <th class="w-[8.6rem]">Year:</th>
        <th><prismic-rich-text :field="page.data.slices[1].primary.year" /></th>
      </tr>
      <tr>
        <th>Edition:</th>
        <th><prismic-rich-text :field="page.data.slices[1].primary.edition" /></th>
      </tr>
      <tr>
        <th>Pages:</th>
        <th><prismic-rich-text :field="page.data.slices[1].primary.pages" /></th>
      </tr>
      <tr>
        <th>Dimensions:</th>
        <th><prismic-rich-text :field="page.data.slices[1].primary.dimensions" /></th>
      </tr>
      <tr>
        <th>Paper:</th>
        <th><prismic-rich-text :field="page.data.slices[1].primary.paper" /></th>
      </tr>
      <tr>
        <th>Copyright:</th>
        <th><prismic-rich-text :field="page.data.slices[1].primary.copyright" /></th>
      </tr>
      <tr>
        <th>ISBN:</th>
        <th><prismic-rich-text :field="page.data.slices[1].primary.isbn" /></th>
      </tr>
    </tbody>
    </table>

    <prismic-rich-text :field="page.data.extra_line" class="font-cooperbt text-sm tracking-[-0.01em] pt-7 md:pt-5 pl-5 md:pl-0"/>
    <div class="font-cooperbt text-sm tracking-[-0.01em] font-bold md:pb-5 pl-5 md:pl-0">€{{ page.data.price }},–</div>
    <form @submit="addToCart($event)" class="pl-5 md:pl-0 mt-1 md:mt-0">
    <input type="hidden" name="uid" :value="page.id" />
    <button class="font-metrik text-xs border w-min border-black rounded-full py-1 px-2 active:bg-sky-700 focus:cursor-no-drop hover:bg-sky-200">ORDER</button>
    </form>
    <div class="absolute md:static top-[62vh] pl-3 md:pl-0 pt-11 md:pt-0">
    <div :style="{'color':page.data.color}" class="md:absolute md:top-[39.5rem] right-[66.25vw] font-cooperbt text-lg tracking-[-0.01em] flex pl-1 md:pl-0"><span v-if="page.data.number == 0" class="text-2xl pr-1">⓿</span><span v-else class="text-2xl pr-1">{{ String.fromCharCode(	0x2775 + Number(page.data.number)) }}</span><prismic-rich-text :field="page.data.title" class="translate-y-0.5"/></div>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
import { getSliceComponentProps } from '@prismicio/vue/components'
import { components } from '~/slices'

import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  async asyncData ({ $prismic, params, store }) {
    const page = await $prismic.api.getByUID('product', params.uid)
    await store.dispatch('prismic/load')
    return {
      page
    }
  },
  data () {
    return { components,
      sshowMobileMenu: false,
    speed: 5000 }
  },
  head () {
    return {
      title: `${this.$prismic.asText(this.page.data.title)} | ${this.$prismic.asText(this.$store.state.prismic.settings.data.siteTitle)}`
    }
  },
  computed: {
    video(){
      return this.page.data.slices[0].primary.video
    }
  },
  methods: { 
    showNext() {
        this.$refs.carousel.next()
        
      },
      showPrev() {
        
        this.$refs.carousel.prev()
      },
      removeDuplicates(data){
      return [...new Set(data)]
    },
    addToCart (event) {
      event.preventDefault();
      const form = new FormData(event.target);
      var orderList = []
      if(localStorage.orders){
        orderList = JSON.parse(localStorage.orders)
      }
      orderList.push(form.get('uid'))
      const nodupe = this.removeDuplicates(orderList)
      localStorage.orders = JSON.stringify(nodupe)
      document.getElementsByClassName('counter')[0].innerText = nodupe.length
      document.getElementsByClassName('counter')[1].innerText = nodupe.length
    }
},
name: 'MyComponent',
    components: { VueSlickCarousel },
    props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
mounted(){
}
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

@media not all and (max-width: 768px) { 
  .asd {
    display: none;
  }
 }

</style>