<template>
  <div class="pb-5">
  <div class="relative w-[56vw] m-auto border border-[#707070]">
   <VueSlickCarousel ref="carousel" :arrows="false" :adaptiveHeight="true" :autoplaySpeed="5000" :autoplay="true" >
      <div v-for="(item, i) in slice.items" :key="`slice-item-${i}`" class="m-auto pt-1.5">    
          <PrismicImage :field="item.image" class="m-auto h-[37.5rem]"/>
        </div>
    </VueSlickCarousel>
    <div v-if="slice.items.length > 1" class="flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2"> <button @click="showPrev" class="hidden md:block"><i class="arrow left"></i></button><button @click="showNext" class="hidden md:block"><i class="arrow right"></i></button></div>
  
  </div>
</div>
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