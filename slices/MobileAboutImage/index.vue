<template><div v-if="isMobile" class="bg-white w-screen md:pb-11 md:pl-36">
  <div class="relative md:w-1/2">
   
      
    <VueSlickCarousel ref="carousel" :arrows="false" :dots="true" :adaptiveHeight="true" :speed="1500" :autoplaySpeed="5000" :autoplay="true">
      <div v-for="(item, i) in slice.items" :key="`slice-item-${i}` " class="relative">    
          <PrismicImage :field="item.image" class="h-[62vh] md:h-[27.313rem] object-cover md:object-scale-down w-full md:w-min"/>
          <PrismicRichText :field="item.fig" class="hidden text-xs md:block px-4 md:px-0 max-w-xs text-gray-300 !pl-2 pt-1 font-circular"/>
          <div class="absolute inline-0 z-40 h-full w-full top-0 hidden md:block"></div>
        </div>
    </VueSlickCarousel><div v-if="slice.items.length > 1" class="flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2"> <button @click="showPrev" class="hidden md:block"><i :style="{'border-color':slice.primary.arrowcolor}" class="arrow left "></i></button><button @click="showNext" class="hidden md:block"><i :style="{'border-color':slice.primary.arrowcolor}" class="arrow right"></i></button></div>
  
  </div></div>
</template>

<script>
  import { getSliceComponentProps } from '@prismicio/vue/components'

  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
 
  export default {
    data(){
    return{
    sshowMobileMenu: false,
    window: {
            width: 0,
            height: 0
            },
      isMobile: false,
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
    name: 'MyComponent',
    components: { VueSlickCarousel },
    props: getSliceComponentProps(['slice', 'index', 'slices', 'context'])
  }
</script> 
<style>
.arrow {
  border: solid;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 12px;
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