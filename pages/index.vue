<template>
  <div class="pb-5">
    <div class="pb-32">
      <div v-if="page[0].data.slices[0]">
        <!-- slider-->
        <template>
          <div @mouseenter="hoveredIndex = 99" @mouseleave="hoveredIndex = null" class="relative md:w-[56vw] m-auto">
            <NuxtLink :to="'/' + page[0].uid">

              <div
                :style="{ 'color': page[0].data.color }"
                class="z-10 group absolute inset-0 flex justify-center items-center text-[1rem] font-aotf flex flex-col gap-4 overflow-hidden">
                <div v-if="page[0].data.sticker == 'OnSale'"
                  class="bg-[#FCEE22] border border-black text-black min-w-[120px] text-center tracking-[-0.025em]">
                  <p class="shimmer">ON SALE</p>
                </div>
                <div v-else-if="page[0].data.sticker == 'PreOrder'"
                  class="bg-white border border-black text-black min-w-[120px] text-center tracking-[-0.025em]">
                  <p class="shimmer">PRE ORDER</p>
                </div>
                <div v-else-if="page[0].data.sticker == 'SoldOut'"
                  class="bg-slate-300 border border-black text-black min-w-[120px] text-center tracking-[-0.025em]">
                  <p class="shimmer">SOLD OUT</p>
                </div>
                <template v-else-if="page[0].data.sticker == 'TwinPack'">
                  <div
                    class="bg-[#00FF4E] border border-black text-black min-w-[120px] text-center mb-[0.938rem] tracking-[-0.025em]">
                    <p class="shimmer">TWIN PACK</p>
                  </div>
                  <div
                    class="bg-[#00FF4E] border border-black text-black min-w-[120px] text-center px-2 tracking-[-0.025em]">
                    <p class="shimmer">
                      <PrismicRichText class="uppercase" :field="page[0].data.purple_text" />
                    </p>
                  </div>
                </template>
                <div v-else-if="page[0].data.sticker == 'PreSale'"
                  :style="{ backgroundColor: page[0].data.sticker_background_color, color: page[0].data.sticker_text_color, textStroke: '0.7px rgb(0, 0, 0)' }"
                  class="absolute bottom-[40px] left-[-40px] rotate-45 border border-black text-black min-w-[196px] text-center tracking-[-0.025em]">
                  <p :style="hoveredIndex === 99 ? {
                    backgroundColor: 'black',
                    backgroundRepeat: 'no-repeat',
                    background: `linear-gradient(135deg, ${page[0].data.sticker_text_color}, #ffffff, ${page[0].data.sticker_text_color})`,
                    backgroundClip: 'text',
                    color: 'transparent',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 4.5s linear infinite'
                  } : {}">PRE SALE</p>
                </div>
                <div v-else-if="page[0].data.sticker == 'Custom'"
                  :style="{ backgroundColor: page[0].data.sticker_background_color, color: page[0].data.sticker_text_color }"
                  class="border border-black min-w-[120px] text-center tracking-[-0.025em] px-2">
                  <p :style="hoveredIndex === 99 ? {
                    backgroundColor: 'black',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `linear-gradient(135deg, ${page[0].data.sticker_text_color}, #ffffff, ${page[0].data.sticker_text_color})`,
                    backgroundClip: 'text',
                    color: 'transparent',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 4.5s linear infinite'
                  } : {}">
                    <PrismicRichText class="uppercase" :field="page[0].data.purple_text" />
                  </p>
                </div>
                <div v-else-if="page[0].data.sticker == 'DuoBook'"
                  :style="{ backgroundColor: page[0].data.sticker_background_color, color: page[0].data.sticker_text_color, textStroke: '0.7px rgb(0, 0, 0)' }"
                  class="rotate-[-30deg] border border-black min-w-[680px] text-center tracking-[-0.025em] px-2">
                  <p :style="hoveredIndex === 99 ? {
                    backgroundColor: 'black',
                    backgroundRepeat: 'no-repeat',
                    background: `linear-gradient(135deg, ${page[0].data.sticker_text_color}, #ffffff, ${page[0].data.sticker_text_color})`,
                    backgroundClip: 'text',
                    color: 'transparent',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 4.5s linear infinite'
                  } : {}">DUO BOOK DUO BOOK DUO BOOK DUO BOOK</p>
                </div>
                <div v-if="page[0].data.status == 'PRE-ORDER' || page[0].data.status == 'customize'"
                  class="flex flex-col text-center gap-[23px]">
                  <div class="text-lg indexcounter pt-[7px]"></div>
                  <div class="text-lg">
                    <PrismicRichText :field="page[0].data.preordertext" />
                  </div>
                </div>
              </div>

              <VueSlickCarousel ref="carousel" :arrows="false" :adaptiveHeight="true" :autoplaySpeed="5000"
                :speed="1500" :autoplay="true">
                <div v-for="(item, i) in page[0].data.slices[0].items" :key="`slice-item-${i}`" class="m-auto pt-1.5">
                  <div class="relative">
                    <PrismicImage :field="item.image"
                      class="md:m-auto h-[62vh] md:h-[75vh] object-cover md:object-scale-down w-full" />
                    <div :class="{
                      'backdrop-brightness-130 backdrop-blur-sm bg-white/50':
                        (page[0].data.status != 'ORDER') &&
                        (
                          page[0].data.blurring == 'all slides' ||
                          (page[0].data.blurring == 'only first slide' && i == 0)
                        )
                    }" class="absolute inset-0"></div>
                  </div>
                </div>
              </VueSlickCarousel>
            </NuxtLink>
            <div v-if="page[0].data.slices[0].items.length > 1"
              class="hidden z-[11] md:flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2"> <button
                @click="showPrev" class="hidden md:block"><i class="arrow left"></i></button><button @click="showNext"
                class="hidden md:block"><i class="arrow right"></i></button></div>
          </div>
        </template>
        <!--end-->
        <div class="md:pb-36">
          <NuxtLink :to="'/' + page[0].uid">
            <!-- title highlight-->
            <div :style="{ 'color': page[0].data.color }"
              class="flex justify-center pt-2.5 md:pt-5 font-cooperbt text-xl items-center gap-0.5">
              <div :style="{ 'background-color': page[0].data.color }"
                class="rounded-full w-6 h-6 text-white flex justify-center items-center font-cooperbtmid tracking-[-0.08em]">
                <p :style="centerNumber(page[0].data.number)">{{ page[0].data.number }}</p>
              </div><prismic-rich-text :field="page[0].data.title" class="" />
            </div>
            <div v-if="page[0].data.title_book_2.length > 0" :style="{ 'color': page[0].data.color_book_2 }"
              class="flex justify-center font-cooperbt text-xl items-center gap-0.5">
              <div :style="{ 'background-color': page[0].data.color_book_2 }"
                class="rounded-full w-6 h-6 text-white flex justify-center items-center font-cooperbtmid tracking-[-0.08em]">
                <p :style="centerNumber(page[0].data.number_book_2)">{{ page[0].data.number_book_2 }}</p>
              </div><prismic-rich-text :field="page[0].data.title_book_2" class="" />
            </div>
            <div class="text-center font-garamond hidden md:block w-[33rem] m-auto"><prismic-rich-text
                :field="page[0].data.description" class="pt-8" />
              <prismic-rich-text v-if="page[0].data.extra_line.text" :field="page[0].data.extra_line"
                class=" font-garamondit pt-5" />
              <div v-if="page[0].data.price > 0" class=" font-garamondit pt-5"><span
                  v-if="page[0].data.old_price != null"
                  class=" font-garamond text-[#FF0000] line-through decoration-2">€{{ page[0].data.old_price }}</span>
                €{{
                  page[0].data.price }},–</div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="md:grid grid-cols-3 2xl:grid-cols-4 md:px-[7vw] gap-x-8 gap-y-[1.25rem] max-w-[2000px] m-auto">
        <div v-for="(item, i) in page" :key="`slice-item-${i}`" class="pt-9 md:pt-0" v-if="i != 0">
          <NuxtLink :to="'/' + item.uid">
            <div class="relative border border-[#707070] w-full h-[62vh] md:h-[38.5vw] 2xl:h-[30.5vw]"
              style="overflow: hidden;">
              <!-- Container for the two halves -->
              <div class="absolute group inset-0 w-full h-full" style="overflow: hidden;">
                <!-- top Half -->
                <div class="absolute top-0 left-0 w-full h-full" style="overflow: hidden;">
                  <PrismicImage :field="item.data.image" class="w-full h-full object-cover" />
                </div>
                <!-- Bottom Half, flipped upside down -->
                <div v-if="item.data.duo_book_image" class="absolute bottom-[-100%] left-0 w-full h-full"
                  style="overflow: hidden;transform: scaleY(-1); transform-origin: top; clip-path: polygon(0% 0%, 100% 0%, 100% 70%, 0% 30%);">
                  <PrismicImage :field="item.data.duo_book_image" class="w-full h-full object-cover" />
                </div>
              </div>
              <div :class="{ 'backdrop-brightness-130 backdrop-blur-sm bg-white/50': item.data.status != 'ORDER' }"
                class="group absolute inset-0 flex flex-col justify-center items-center text-[1rem] font-aotf overflow-hidden"
                @mouseenter="hoveredIndex = i" @mouseleave="hoveredIndex = null">
                <div v-if="item.data.sticker == 'OnSale'"
                  class="bg-[#FCEE22] border border-black text-black min-w-[120px] text-center tracking-[-0.025em]">
                  <p class="shimmer">ON SALE</p>
                </div>
                <div v-else-if="item.data.sticker == 'PreOrder'"
                  class="bg-white border border-black text-black min-w-[120px] text-center tracking-[-0.025em]">
                  <p class="shimmer">PRE ORDER</p>
                </div>
                <div v-else-if="item.data.sticker == 'SoldOut'"
                  class="bg-slate-300 border border-black text-black min-w-[120px] text-center tracking-[-0.025em]">
                  <p class="shimmer">SOLD OUT</p>
                </div>
                <template v-else-if="item.data.sticker == 'TwinPack'">
                  <div
                    class="bg-[#00FF4E] border border-black text-black min-w-[120px] text-center mb-[0.938rem] tracking-[-0.025em]">
                    <p class="shimmer">TWIN PACK</p>
                  </div>
                  <div
                    class="bg-[#00FF4E] border border-black text-black min-w-[120px] text-center px-2 tracking-[-0.025em]">
                    <p class="shimmer">
                      <PrismicRichText class="uppercase" :field="item.data.purple_text" />
                    </p>
                  </div>
                </template>
                <div v-else-if="item.data.sticker == 'PreSale'"
                  :style="{ backgroundColor: item.data.sticker_background_color, color: item.data.sticker_text_color, textStroke: '0.7px rgb(0, 0, 0)' }"
                  class="absolute bottom-[40px] left-[-40px] rotate-45 border border-black text-black min-w-[196px] text-center tracking-[-0.025em]">
                  <p :style="hoveredIndex === i ? {
                    background: `linear-gradient(135deg, ${item.data.sticker_text_color}, #ffffff, ${item.data.sticker_text_color})`,
                    backgroundClip: 'text',
                    color: 'transparent',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 5s linear infinite'
                  } : {}">PRE SALE</p>
                </div>
                <div v-else-if="item.data.sticker == 'Custom'"
                  :style="{ backgroundColor: item.data.sticker_background_color, color: item.data.sticker_text_color }"
                  class="border border-black min-w-[120px] text-center tracking-[-0.025em] px-2">
                  <p :style="hoveredIndex === i ? {
                    background: `linear-gradient(135deg, ${item.data.sticker_text_color}, #ffffff, ${item.data.sticker_text_color})`,
                    backgroundClip: 'text',
                    color: 'transparent',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 5s linear infinite'
                  } : {}">
                    <PrismicRichText class="uppercase" :field="item.data.purple_text" />
                  </p>
                </div>
                <div v-else-if="item.data.sticker == 'DuoBook'"
                  :style="{ backgroundColor: item.data.sticker_background_color, color: item.data.sticker_text_color, textStroke: '0.7px rgb(0, 0, 0)' }"
                  class="rotate-[-30deg] border border-black min-w-[680px] text-center tracking-[-0.025em] px-2">
                  <p :style="hoveredIndex === i ? {
                    background: `linear-gradient(135deg, ${item.data.sticker_text_color}, #ffffff, ${item.data.sticker_text_color})`,
                    backgroundClip: 'text',
                    color: 'transparent',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 5s linear infinite'
                  } : {}">DUO BOOK DUO BOOK DUO BOOK DUO BOOK</p>
                </div>
              </div>
            </div>
            <!-- title usual-->
            <div>
              <div :style="{ 'color': item.data.color }"
                class="flex justify-center pt-4 md:pt-5 font-cooperbt text-xl items-center gap-0.5"><span>
                  <div :style="{ 'background-color': item.data.color }"
                    class="rounded-full w-6 h-6 text-white flex justify-center items-center font-cooperbtmid tracking-[-0.08em]">
                    <p :style="centerNumber(item.data.number)">{{ item.data.number }}</p>
                  </div>
                </span><prismic-rich-text :field="item.data.title" /></div>
              <div :style="{ 'color': item.data.color_book_2 }"
                class="flex justify-center font-cooperbt text-xl items-center gap-0.5"><span>
                  <div :style="{ 'background-color': item.data.color_book_2 }"
                    class="rounded-full w-6 h-6 text-white flex justify-center items-center font-cooperbtmid tracking-[-0.08em]">
                    <p :style="centerNumber(item.data.number_book_2)">{{ item.data.number_book_2 }}</p>
                  </div>
                </span><prismic-rich-text :field="item.data.title_book_2" /></div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-if="settings.data.faqpdf.link_type == 'Media'" class="m-auto text-center"><a :href="settings.data.faqpdf.url"
        target="_blank" class="font-garamondit underline text-2xl">FAQ</a></div>
  </div>
</template>

<script>
import { components } from '~/slices'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  async asyncData({ $prismic, store }) {
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
  data() {
    return {
      hoveredIndex: null,
      components,
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
  mounted() {
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
      if (e > 9) {
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
      var d = new Date(Date.UTC(b[0], --b[1], b[2] - 1, 19))
      // Utility to add leading zero
      function z(n) {
        return (n < 10 ? '0' : '') + n;
      }

      // Convert string to date object
      var diff = d - new Date();

      // Allow for previous times
      var sign = diff < 0 ? '-' : '';
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
      if (window.innerWidth < 640 || window.innerHeight < 640) {
        this.isMobile = true
      } else { this.isMobile = false }
    }
  },
  head() {
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

/* Shimmer effect class, only active on hover */
.group:hover .shimmer {
  background-color: black;
  background-image: linear-gradient(135deg, #000000, #ffffff, #000000);
  background-clip: text;
  background-repeat: no-repeat;
  color: transparent;
  background-size: 200% 100%;
  animation: shimmer 4.5s linear infinite;
}

@keyframes shimmer {
 0% {
    background-position: 200% 0;
  }
  55% {
    background-position: -200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}
</style>