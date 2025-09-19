<template>
  <div class="pb-5">
  <div class="pb-32">
    <div v-if="page[0].data.slices[0]">
      <!--mobile slider-->
      <template v-if="isMobile && page[0].data.slices[2] && page[0].data.slices[2].slice_type == 'mobile_slider'">
    <div class="relative md:w-[56vw] m-auto">
      <NuxtLink :to="'/'+page[0].uid">
    <VueSlickCarousel ref="carousel" :arrows="false" :adaptiveHeight="true" :autoplaySpeed="5000" :speed="1500" :autoplay="true">
    <div v-for="(item, i) in page[0].data.slices[2].items" :key="`slice-item-${i}`" class="m-auto pt-1.5">    
      <div class="relative"><PrismicImage :field="item.image" class="md:m-auto h-[62vh] md:h-[75vh] object-cover md:object-scale-down w-full"/><div v-if="page[0].data.status != 'ORDER' && page[0].data.blurring == 'all slides' || page[0].data.status != 'ORDER' && page[0].data.blurring == 'only first slide' && i == 0" :class="page[0].data.status == 'email'?'':'preorder'" class="absolute inset-0 backdrop-brightness-130 backdrop-blur-lg bg-white/60 flex justify-center items-center text-2xl font-cooperbt text-[#6200FF]"><div v-if="page[0].data.status == 'email'" class="opacity-60">「out of stock」</div><div v-else-if="page[0].data.status == 'PRE-ORDER' || item.data.status == 'customize'" class="opacity-60 flex flex-col text-center gap-[23px]">「{{ page[0].data.purple_text[0].text }}」<div class="text-lg indexcounter pt-[7px]"></div><div class="text-lg font-garamond"><PrismicRichText :field="page[0].data.preordertext" /></div></div></div></div>
    </div>
  </VueSlickCarousel>
</NuxtLink>
  <div v-if="page[0].data.slices[0].items.length > 1" class="hidden md:flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2"> <button @click="showPrev" class="hidden md:block"><i class="arrow left"></i></button><button @click="showNext" class="hidden md:block"><i class="arrow right"></i></button></div>
</div>
</template>
<!-- slider-->
<template v-else >
<div class="relative md:w-[56vw] m-auto">
  <NuxtLink :to="'/'+page[0].uid">
<VueSlickCarousel ref="carousel" :arrows="false" :adaptiveHeight="true" :autoplaySpeed="5000" :speed="1500" :autoplay="true">
<div v-for="(item, i) in page[0].data.slices[0].items" :key="`slice-item-${i}`" class="m-auto pt-1.5">    
  <div class="relative"><PrismicImage :field="item.image" class="md:m-auto h-[62vh] md:h-[75vh] object-cover md:object-scale-down w-full"/><div v-if="page[0].data.status != 'ORDER' && page[0].data.blurring == 'all slides' || page[0].data.status != 'ORDER' && page[0].data.blurring == 'only first slide' && i == 0" :class="page[0].data.status == 'email'?'':'preorder'" class="absolute inset-0 backdrop-brightness-130 backdrop-blur-lg bg-white/60 flex justify-center items-center text-2xl font-cooperbt text-[#6200FF]"><div v-if="page[0].data.status == 'email'" class="opacity-60">「out of stock」</div><div v-else-if="page[0].data.status == 'PRE-ORDER'|| page[0].data.status == 'customize'" class="opacity-60  flex flex-col text-center gap-[23px]">「{{ page[0].data.purple_text[0].text }}」<div class="text-lg indexcounter pt-[7px]"></div><div class="text-lg font-garamond"><PrismicRichText :field="page[0].data.preordertext" /></div></div></div></div>
</div>
</VueSlickCarousel>
</NuxtLink>
<div v-if="page[0].data.slices[0].items.length > 1" class="hidden md:flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2"> <button @click="showPrev" class="hidden md:block"><i class="arrow left"></i></button><button @click="showNext" class="hidden md:block"><i class="arrow right"></i></button></div>
</div>
</template>
<!--end-->
<div class="md:pb-36">
  <NuxtLink :to="'/'+page[0].uid">
<!-- title highlight-->
  <div :style="{'color':page[0].data.color}" class="flex justify-center pt-2.5 md:pt-5 font-cooperbt text-xl items-center gap-0.5"><div :style="{'background-color':page[0].data.color}" class="rounded-full w-6 h-6 text-white flex justify-center items-center font-cooperbtmid tracking-[-0.08em]"><p :style="centerNumber(page[0].data.number)">{{ page[0].data.number }}</p></div><prismic-rich-text :field="page[0].data.title" class="" /></div>
  <div v-if="page[0].data.title_book_2.length > 0" :style="{'color':page[0].data.color_book_2}" class="flex justify-center font-cooperbt text-xl items-center gap-0.5"><div :style="{'background-color':page[0].data.color_book_2}" class="rounded-full w-6 h-6 text-white flex justify-center items-center font-cooperbtmid tracking-[-0.08em]"><p :style="centerNumber(page[0].data.number_book_2)">{{ page[0].data.number_book_2 }}</p></div><prismic-rich-text :field="page[0].data.title_book_2" class="" /></div>
  <div class="text-center font-garamond hidden md:block w-[33rem] m-auto" ><prismic-rich-text :field="page[0].data.description" class="pt-8" />
  <prismic-rich-text v-if="page[0].data.extra_line.text" :field="page[0].data.extra_line" class=" font-garamondit pt-5" />
  <div v-if="page[0].data.price > 0" class=" font-garamondit pt-5"><span v-if="page[0].data.old_price != null" class=" font-garamond text-[#FF0000] line-through decoration-2">€{{ page[0].data.old_price }}</span> €{{ page[0].data.price }},–</div></div>
  </NuxtLink>
</div>
</div>
  <div class="md:grid grid-cols-3 2xl:grid-cols-4 md:px-[7vw] gap-x-8 gap-y-[1.25rem] max-w-[2000px] m-auto">
    <div v-for="(item, i) in page" :key="`slice-item-${i}`" class="pt-9 md:pt-0" v-if="i != 0">
    <NuxtLink :to="'/'+item.uid">
    <div class="relative border border-[#707070]"><PrismicImage :field="item.data.image" class="h-[62vh] md:h-[38.5vw] 2xl:h-[30.5vw] w-full md:border object-cover"/><div v-if="item.data.status != 'ORDER'" :class="item.data.status == 'email'?'':'preorder'" class="absolute inset-0 backdrop-brightness-130 backdrop-blur-sm bg-white/50 flex justify-center items-center text-2xl font-cooperbt text-[#6200FF]"><div v-if="item.data.status == 'email'" class="opacity-60">「out of stock」</div><div v-else-if="item.data.status == 'PRE-ORDER' || item.data.status == 'customize' " class="opacity-60">「{{ item.data.purple_text[0].text }}」</div></div></div>
<!-- title usual-->
   <div>
    <div :style="{'color':item.data.color}" class="flex justify-center pt-4 md:pt-5 font-cooperbt text-xl items-center gap-0.5"><span><div :style="{'background-color':item.data.color}" class="rounded-full w-6 h-6 text-white flex justify-center items-center font-cooperbtmid tracking-[-0.08em]"><p :style="centerNumber(item.data.number)">{{ item.data.number }}</p></div></span><prismic-rich-text :field="item.data.title"/></div>
    <div :style="{'color':item.data.color_book_2}" class="flex justify-center font-cooperbt text-xl items-center gap-0.5"><span><div :style="{'background-color':item.data.color_book_2}" class="rounded-full w-6 h-6 text-white flex justify-center items-center font-cooperbtmid tracking-[-0.08em]"><p :style="centerNumber(item.data.number_book_2)">{{ item.data.number_book_2 }}</p></div></span><prismic-rich-text :field="item.data.title_book_2"/></div>
  </div>
  </NuxtLink>
  </div>
</div>
</div>
<div v-if="settings.data.faqpdf.link_type == 'Media'" class="m-auto text-center"><a :href="settings.data.faqpdf.url" target="_blank" class="font-garamondit underline text-2xl">FAQ</a></div>
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
      const items = await $prismic.api.getSingle('index_page')
      const page = []
      for (let i = 0; i < items.data.products.length; i++) {
        page.push(await $prismic.api.getByUID('product', items.data.products[i].product.uid))
      }
      await store.dispatch('prismic/load')
      return {
        items,
        page
      }
    },
  data () {
    return { components,
      iinterval: null,
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
        if (this.page[0].data.preorderlaunchdate) {
          this.indexTimeToGo();
    this.iinterval = setInterval(this.indexTimeToGo, 1000)
        }
},
beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
        clearInterval(this.iinterval);
    },
  methods: {
    centerNumber(e) {
      if(e>9){
        return 'transform: translate(-1.5px);'
      }
      switch (e) {
        case 4:
        return 'transform: translate(-1.5px);'
        case 8:
        return 'transform: translate(-1.25px);'
        case 9:
        return 'transform: translate(-1px);'
        case 2:
        return 'transform: translate(-1px);'
        case 6:
        return 'transform: translate(-.5px);'
        case 1:
        return 'transform: translate(-1px);'
        case 0:
        return 'transform: translate(-1px);'
      default:
      }
    },
    indexTimeToGo() {
        const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

	var b = this.page[0].data.preorderlaunchdate.split(/[-TZ:]/i)
	var d = new Date(Date.UTC(b[0], --b[1], b[2]-1, 19))
    // Utility to add leading zero
    function z(n) {
      return (n < 10? '0' : '') + n;
    }

    // Convert string to date object
    var diff = d - new Date();

    // Allow for previous times
    var sign = diff < 0? '-' : '';
    diff = Math.abs(diff);

    // Return formatted string
    const all = document.getElementsByClassName('indexcounter')
    for (let i = 0; i < all.length; i++) {
      all[i].innerText = sign + z(Math.floor(diff / (day))) + ' days ' + z(Math.floor((diff % (day)) / (hour))) + ' hours ' + z(Math.floor((diff % (minute)) / second)) + ' seconds till launch';
    }
	    },
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
}
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>