<template>
  <div class="pb-5">
  <div class="relative md:w-[56vw] m-auto">
   <VueSlickCarousel ref="carousel" :arrows="false" :adaptiveHeight="true" :autoplaySpeed="speed" :autoplay="true" >
      <div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="m-auto pt-1.5">    
          <PrismicImage :field="item.image" class="md:m-auto h-[62vh] md:h-[37.5rem] object-cover md:object-scale-down w-full"/>
        </div>
        <div v-if="video.url" class="m-auto pt-1.5 relative">
        <video onclick="this.play(); this.nextElementSibling.remove()" type="video/mp4" playsinline id="vd" :src="video.url" class="md:m-auto h-[62vh] md:h-[37.5rem] object-cover md:object-scale-down w-full cursor-pointer"></video>
        <div class="pointer-events-none absolute top-3/4 left-1/2 -translate-x-1/2 text-2xl bg-white px-1.5 rounded-full font-metrik">click to play &#x23F5;</div>
      </div>
    </VueSlickCarousel>
    <div v-if="slice.items.length > 1" class="md:flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2 hidden"> <button @click="showPrev" class="hidden md:block"><i class="arrow left"></i></button><button @click="showNext" class="hidden md:block"><i class="arrow right"></i></button></div>
  </div>
</div>
</template>

<script>
  import { getSliceComponentProps } from '@prismicio/vue/components'

  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
 
  export default {
    data(){
    return{
    sshowMobileMenu: false,
    speed: 5000
    }
  },
  computed: {
    video(){
      return this.slice.primary.video
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
    name: 'MyComponent',
    components: { VueSlickCarousel },
    props: getSliceComponentProps(['slice', 'index', 'slices', 'context'])
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