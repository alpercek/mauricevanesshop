<template>
  <div class="relative pb-32">
    <!-- mobile slider -->
    <template v-if="isMobile && page.data.slices[2]">
    <div v-if="page.data.slices[2]" class="pb-5">
  <div class="relative md:w-[56vw] m-auto">
   <VueSlickCarousel ref="carousel" :arrows="false" :adaptiveHeight="true" :dots="true" :autoplaySpeed="speed" :speed="1500" :autoplay="true" >
      <div v-for="(item, i) in page.data.slices[2].items" :key="`slice-item-${i}`" class="m-auto pt-1.5">    
        <div class="relative"><PrismicImage :field="item.image" class="md:m-auto h-[62vh] md:h-[50vh] object-cover md:object-scale-down w-full"/><div v-if="page.data.status != 'ORDER' && page.data.blurring == 'all slides' || page.data.status != 'ORDER' && page.data.blurring == 'only first slide' && i == 0" class="absolute inset-0 backdrop-blur bg-white/60 flex justify-center items-center text-2xl font-cooperbt text-[#6200FF]"><div v-if="page.data.status == 'email'" class="opacity-60">「out of stock」</div><div v-else-if="page.data.status == 'PRE-ORDER' || page.data.status == 'customize'" class="opacity-60">「{{ page.data.purple_text[0].text }}」</div></div></div>
        </div>
        <div v-if="mobileVideo.url" class="m-auto pt-1.5 relative">
        <video onclick="this.play(); this.nextElementSibling.remove()" type="video/mp4" playsinline id="vd" :src="video.url" class="md:m-auto h-[62vh] md:h-[50vh] object-cover md:object-scale-down w-full cursor-pointer"></video>
        <div class="pointer-events-none absolute top-3/4 left-1/2 -translate-x-1/2 text-2xl bg-white px-1.5 rounded-full font-metrik">click to play &#x23F5;</div>
      </div>
    </VueSlickCarousel>
    <div v-if="page.data.slices[0].items.length > 1" class="md:flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2 hidden"> <button @click="showPrev" class="hidden md:block"><i class="arrow left"></i></button><button @click="showNext" class="hidden md:block"><i class="arrow right"></i></button></div>
  </div>
</div>
</template>
<!-- slider-->
<template v-else>
<div v-if="page.data.slices[0]" class="pb-5">
  <div class="relative md:w-[56vw] m-auto">
   <VueSlickCarousel ref="carousel" :arrows="false" :adaptiveHeight="true" :dots="true" :autoplaySpeed="speed" :speed="1500" :autoplay="true" >
      <div v-for="(item, i) in page.data.slices[0].items" :key="`slice-item-${i}`" class="m-auto pt-1.5">
        <div class="relative"><PrismicImage :field="item.image" class="md:m-auto h-[62vh] md:h-[50vh] object-cover md:object-scale-down w-full"/><div v-if="page.data.status != 'ORDER' && page.data.blurring == 'all slides' || page.data.status != 'ORDER' && page.data.blurring == 'only first slide' && i == 0" class="absolute inset-0 backdrop-blur bg-white/60 flex justify-center items-center text-2xl font-cooperbt text-[#6200FF]"><div v-if="page.data.status == 'email'" class="opacity-60">「out of stock」</div><div v-else-if="page.data.status == 'PRE-ORDER'|| page.data.status == 'customize'" class="opacity-60">「{{ page.data.purple_text[0].text }}」</div></div></div>
        </div>
        <div v-if="video.url" class="m-auto pt-1.5 relative">
        <video onclick="this.play(); this.nextElementSibling.remove()" type="video/mp4" playsinline id="vd" :src="video.url" class="md:m-auto h-[62vh] md:h-[50vh] object-cover md:object-scale-down w-full cursor-pointer"></video>
        <div class="pointer-events-none absolute top-3/4 left-1/2 -translate-x-1/2 text-2xl bg-white px-1.5 rounded-full font-metrik">click to play &#x23F5;</div>
      </div>
    </VueSlickCarousel>
    <div v-if="page.data.slices[0].items.length > 1" class="md:flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2 hidden"> <button @click="showPrev" class="hidden md:block"><i class="arrow left"></i></button><button @click="showNext" class="hidden md:block"><i class="arrow right"></i></button></div>
</div>
</div>
</template>
<!-- rest -->
    <div>
      <div class="md:ml-[43vw] mt-14 md:mt-0">
    <prismic-rich-text :field="page.data.description" class="font-garamond text-base w-[25rem] pl-4 md:pl-0 mt-9 md:mt-7" />
<!-- bookinfo-->
<table v-if="page.data.slices[1]" class="font-cooperbt text-left tracking-[-0.01em] text-base ml-7 md:ml-0 mt-9 md:mt-7">
      <tbody>
      <tr v-if="page.data.slices[1].primary.year.length > 0">
        <th class="w-[8.6rem] font-normal">Year:</th>
        <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.year" /></th>
      </tr>
      <tr v-if="page.data.slices[1].primary.edition.length > 0">
        <th class="w-[8.6rem] font-normal">Edition:</th>
        <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.edition" /></th>
      </tr>
      <tr v-if="page.data.slices[1].primary.pages.length > 0">
        <th class="w-[8.6rem] font-normal">Pages:</th>
        <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.pages" /></th>
      </tr>
      <tr v-if="page.data.slices[1].primary.dimensions.length > 0">
        <th class="w-[8.6rem] font-normal">Dimensions:</th>
        <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.dimensions" /></th>
      </tr>
      <tr v-if="page.data.slices[1].primary.paper.length > 0">
        <th class="w-[8.6rem] font-normal">Paper:</th>
        <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.paper" /></th>
      </tr>
      <tr v-if="page.data.slices[1].primary.copyright.length > 0">
        <th class="w-[8.6rem] font-normal">Copyright:</th>
        <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.copyright" /></th>
      </tr>
      <tr v-if="page.data.slices[1].primary.isbn.length > 0">
        <th class="w-[8.6rem] font-normal">ISBN:</th>
        <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.isbn" /></th>
      </tr>
    </tbody>
    <tbody v-for="(item, i) in page.data.slices[1].items" :key="`slice-item-${i}`">
      <tr>
        <th class="w-[8.6rem] font-normal"><prismic-rich-text :field="item.title"/></th>
        <th class="font-normal"><prismic-rich-text :field="item.content" /></th>
      </tr>
    </tbody>
    </table>

    <prismic-rich-text :field="page.data.extra_line" class="font-cooperbt text-base tracking-[-0.01em] pt-7 md:pt-5 pl-5 md:pl-0"/>
    <div v-if="page.data.price != null" class="font-cooperbt text-base tracking-[-0.01em] font-bold md:pb-5 pl-5 md:pl-0">€{{ page.data.price }},–</div>
    <form @submit="addToCart($event)" class="pl-5 md:pl-0 mt-1 md:mt-0">
    <input type="hidden" name="uid" :value="page.id" />
    <button onclick="this.parentNode.querySelector('span').style.opacity = 1" v-if="page.data.status == 'ORDER'" class="font-metrik text-xs border w-min border-black rounded-full py-1 px-2 active:bg-sky-700 focus:cursor-no-drop hover:bg-sky-200">ORDER</button>
    <button onclick="this.parentNode.querySelector('span').style.opacity = 1" v-if="page.data.status == 'PRE-ORDER'" class="font-metrik text-xs border w-max border-black rounded-full py-1 px-2 active:bg-sky-700 focus:cursor-no-drop hover:bg-sky-200">PRE-ORDER</button>
    <button onclick="this.parentNode.querySelector('span').style.opacity = 1" v-if="page.data.status == 'customize' && page.data.price != null" class="uppercase font-metrik text-xs border w-max border-black rounded-full py-1 px-2 active:bg-sky-700 focus:cursor-no-drop hover:bg-sky-200">{{page.data.customized_text}}</button>
    <span class="ml-1 italic font-garamond text-[#BCBCBC] text-lg transition-opacity opacity-0">Item has been added to cart</span>
    </form>

    <!--newsletter-->
    <form v-if="page.data.status == 'email' || page.data.status == 'customize' && page.data.price == null && page.data.customized_text != null" class="email-form pl-5 md:pl-0 mt-1 md:mt-0 text-sm" name="newsletter" method="POST" netlify netlify-honeypot="bot-field" action="/.netlify/functions/subscribeToMailjet">
  <label for="email" class="sr-only"> Email </label>
  <div>
    <input required type="email" name="email" id="email" :placeholder="page.data.status == 'customize'? page.data.customized_text :'Receive e-mail when in stock'" class="py-1 px-2 border w-max rounded-full" />
    <button type="submit" class="font-metrik border w-max border-black rounded-full py-1 px-2 active:bg-sky-700 focus:cursor-no-drop hover:bg-sky-200">Send</button>
  </div>
  <div class="hidden">
    <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
  </div>
</form>

    <div class="absolute md:static top-[62vh] pl-3 md:pl-0 pt-11 md:pt-0 pointer-events-none">
    <div :style="{'color':page.data.color}" class="md:absolute md:top-[calc(50vh+3.5rem)] right-[66.25vw] font-cooperbt text-[1.25rem] tracking-[-0.01em] flex pl-1 md:pl-0 items-center gap-0.5"><div :style="{'background-color':page.data.color}" class="rounded-full w-6 h-6 text-white flex justify-center items-center">{{ page.data.number }}</div><prismic-rich-text :field="page.data.title" class="translate-y-0.5"/></div>
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
      window: {
            width: 0,
            height: 0
            },
      isMobile: false,
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
    },
    mobileVideo(){
      return this.page.data.slices[2].primary.video
    },
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
      removeDuplicates(data){
      return [...new Set(data)]
    },
    playSoundEffect(){
      const sound = this.settings.data.add_to_cart_sound
      if (sound.link_type == "Media"){
       new Audio(sound.url).play()
      }
    },
    addToCart (event) {
      event.preventDefault();
      this.playSoundEffect()
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
    },
    handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
            if (window.innerWidth < 640 || window.innerHeight < 640 ) {
                this.isMobile = true
            } else { this.isMobile = false }
        }
},
name: 'MyComponent',
    components: { VueSlickCarousel },
    props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
mounted(){
  window.addEventListener('resize', this.handleResize);
        this.handleResize();
},
beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
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
.slick-dots{
  max-height: 36px;
  overflow: hidden;
}
</style>