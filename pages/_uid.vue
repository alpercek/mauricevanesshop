<template>
  <div class="relative pb-32 max-w-screen overflow-hidden">
    <!-- slider-->
    <template>
      <div v-if="page.data.slices[0]" class="pb-5">
        <div class="relative md:w-[56vw] m-auto">
          <VueSlickCarousel ref="carousel" :arrows="false" :adaptiveHeight="true" :dots="true" :autoplaySpeed="speed"
            :speed="1500" :autoplay="true">
            <div v-for="(item, i) in page.data.slices[0].items" :key="`slice-item-${i}`" class="m-auto pt-1.5">

              <div class="relative">
                <PrismicImage :field="item.image"
                  class="md:m-auto h-[62vh] md:h-[50vh] object-cover md:object-scale-down w-full" />
                <div :class="{
                      'backdrop-brightness-130 backdrop-blur-sm bg-white/50':
                        (page.data.status != 'ORDER') &&
                        (
                          page.data.blurring == 'all slides' ||
                          (page.data.blurring == 'only first slide' && i == 0)
                        )
                    }" 
                    @mouseenter="hoveredIndex = i" @mouseleave="hoveredIndex = null"
                    :style="{ 'color': page.data.color }"
                      class="group absolute inset-0 flex justify-center items-center text-[1.313rem] font-aotf flex flex-col gap-4 overflow-hidden">
                  <div v-if="page.data.sticker == 'OnSale'"
                        class="bg-[#FCEE22] border border-black text-black min-w-[150px] text-center tracking-[-0.025em]">
                        <p class="shimmer">ON SALE</p>
                      </div>
                      <div v-else-if="page.data.sticker == 'PreOrder'"
                        class="bg-white border border-black text-black min-w-[150px] text-center tracking-[-0.025em]">
                        <p class="shimmer">PRE ORDER</p>
                      </div>
                      <div v-else-if="page.data.sticker == 'SoldOut'"
                        class="bg-slate-300 border border-black text-black min-w-[150px] text-center tracking-[-0.025em]">
                        <p class="shimmer">SOLD OUT</p>
                      </div>
                      <template v-else-if="page.data.sticker == 'TwinPack'">
                        <div
                          class="bg-[#00FF4E] border border-black text-black min-w-[150px] text-center mb-[0.938rem] tracking-[-0.025em]">
                          <p class="shimmer">TWIN PACK</p>
                        </div>
                        <div
                          class="bg-[#00FF4E] border border-black text-black min-w-[150px] text-center px-2 tracking-[-0.025em]">
                          <p class="shimmer">
                            <PrismicRichText class="uppercase" :field="page.data.purple_text" />
                          </p>
                        </div>
                      </template>
                      <div v-else-if="page.data.sticker == 'PreSale'"
                        :style="{ backgroundColor: page.data.sticker_background_color, color: page.data.sticker_text_color, textStroke: '0.7px rgb(0, 0, 0)' }"
                        class="absolute bottom-[40px] left-[-40px] rotate-45 border border-black text-black min-w-[196px] text-center tracking-[-0.025em]">
                        <p :style="hoveredIndex === i ? {
                          background: `linear-gradient(135deg, ${page.data.sticker_text_color}, #ffffff, ${page.data.sticker_text_color})`,
                          backgroundClip: 'text',
                          color: 'transparent',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 5s linear infinite'
                        } : {}">PRE SALE</p>
                      </div>
                      <div v-else-if="page.data.sticker == 'Custom'"
                        :style="{ backgroundColor: page.data.sticker_background_color, color: page.data.sticker_text_color }"
                        class="border border-black min-w-[150px] text-center tracking-[-0.025em] px-2">
                        <p :style="hoveredIndex === i ? {
                          background: `linear-gradient(135deg, ${page.data.sticker_text_color}, #ffffff, ${page.data.sticker_text_color})`,
                          backgroundClip: 'text',
                          color: 'transparent',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 5s linear infinite'
                        } : {}">
                          <PrismicRichText class="uppercase" :field="page.data.purple_text" />
                        </p>
                      </div>
                      <div v-else-if="page.data.sticker == 'DuoBook'"
                        :style="{ backgroundColor: page.data.sticker_background_color, color: page.data.sticker_text_color, textStroke: '0.7px rgb(0, 0, 0)' }"
                        class="rotate-[-30deg] border border-black min-w-[680px] text-center tracking-[-0.025em] px-2">
                        <p :style="hoveredIndex === i ? {
                          background: `linear-gradient(135deg, ${page.data.sticker_text_color}, #ffffff, ${page.data.sticker_text_color})`,
                          backgroundClip: 'text',
                          color: 'transparent',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 5s linear infinite'
                        } : {}">DUO BOOK DUO BOOK DUO BOOK DUO BOOK</p>
                      </div>
                  <div v-if="page.data.status == 'PRE-ORDER' || page.data.status == 'customize'"
                    class="flex flex-col text-center gap-[23px]"><div
                      class="text-lg alpercounter pt-[7px]"></div>
                  </div>
                </div>
              </div>

            </div>
            <div v-if="video.url" class="m-auto pt-1.5 relative">
              <video onclick="this.play(); this.nextElementSibling.remove()" type="video/mp4" playsinline id="vd"
                :src="video.url"
                class="md:m-auto h-[62vh] md:h-[50vh] object-cover md:object-scale-down w-full cursor-pointer"></video>
              <div
                class="pointer-events-none absolute top-3/4 left-1/2 -translate-x-1/2 text-2xl bg-white px-1.5 rounded-full font-metrik">
                click to play &#x23F5;</div>
            </div>
            <div v-if="videoUrl">
              <iframe class="md:m-auto h-[62vh] md:h-[50vh] object-cover md:object-scale-down w-full cursor-pointer"
                :src="videoUrl" width="640" height="360" frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
            </div>
          </VueSlickCarousel>
          <div v-if="page.data.slices[0].items.length > 1"
            class="md:flex justify-between px-4 h-12 w-full -translate-y-1/2 absolute top-1/2 hidden"> <button
              @click="showPrev" class="hidden md:block"><i class="arrow left"></i></button><button @click="showNext"
              class="hidden md:block"><i class="arrow right"></i></button></div>
        </div>
      </div>
    </template>
    <div>
      <div class="md:ml-[43vw] mt-14 md:mt-0">
        <!-- bookinfo-->
        <table v-if="page.data.slices[1]" ref="firsttable"
          class="font-cooperbt text-left tracking-[-0.01em] text-base ml-7 md:ml-0 mt-9 md:mt-7">
          <tbody>
            <tr v-if="page.data.slices[1].primary.year.length > 0">
              <th class="w-[8.6rem] align-top font-normal">Year:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.year" /></th>
            </tr>
            <tr v-if="page.data.slices[1].primary.edition.length > 0">
              <th class="w-[8.6rem] align-top font-normal">Edition:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.edition" /></th>
            </tr>
            <tr v-if="page.data.slices[1].primary.pages.length > 0">
              <th class="w-[8.6rem] align-top font-normal">Pages:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.pages" /></th>
            </tr>
            <tr v-if="page.data.slices[1].primary.dimensions.length > 0">
              <th class="w-[8.6rem] align-top font-normal">Dimensions:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.dimensions" /></th>
            </tr>
            <tr v-if="page.data.slices[1].primary.paper.length > 0">
              <th class="w-[8.6rem] align-top font-normal">Paper:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.paper" /></th>
            </tr>
            <tr v-if="page.data.slices[1].primary.copyright.length > 0">
              <th class="w-[8.6rem] align-top font-normal">Copyright:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.copyright" /></th>
            </tr>
            <tr v-if="page.data.slices[1].primary.isbn.length > 0">
              <th class="w-[8.6rem] align-top font-normal">ISBN:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[1].primary.isbn" /></th>
            </tr>
          </tbody>
          <tbody v-for="(item, i) in page.data.slices[1].items" :key="`slice-item-${i}`">
            <tr>
              <th class="w-[8.6rem] align-top font-normal"><prismic-rich-text :field="item.title" /></th>
              <th class="font-normal"><prismic-rich-text :field="item.content" /></th>
            </tr>
          </tbody>
        </table>
        <div class="pl-3 md:pl-0 pt-11 md:pt-0">
          <div :style="{ 'color': page.data.color_book_2, 'top': 'calc(50vh + 5.25rem + ' + computedHeight + 'px)' }"
            class="md:absolute right-[66.25vw] font-cooperbt text-[1.25rem] tracking-[-0.01em] flex pl-1 md:pl-0 items-center gap-0.5">
            <div :style="{ 'background-color': page.data.color_book_2 }"
              class="rounded-full w-6 h-6 text-white flex justify-center items-center font-cooperbtmid tracking-[-0.08em]">
              <p :style="centerNumber(page.data.number_book_2)">{{ page.data.number_book_2 }}</p>
            </div><prismic-rich-text :field="page.data.title_book_2" class="translate-y-0.5" />
          </div>
        </div>
        <table v-if="page.data.slices[2] && page.data.slices[2].slice_type == 'book_info'"
          class="font-cooperbt text-left tracking-[-0.01em] text-base ml-7 md:ml-0 mt-[1.313rem] md:mt-7">
          <tbody>
            <tr v-if="page.data.slices[2].primary.year.length > 0">
              <th class="w-[8.6rem] align-top font-normal">Year:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[2].primary.year" /></th>
            </tr>
            <tr v-if="page.data.slices[2].primary.edition.length > 0">
              <th class="w-[8.6rem] align-top font-normal">Edition:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[2].primary.edition" /></th>
            </tr>
            <tr v-if="page.data.slices[2].primary.pages.length > 0">
              <th class="w-[8.6rem] align-top font-normal">Pages:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[2].primary.pages" /></th>
            </tr>
            <tr v-if="page.data.slices[2].primary.dimensions.length > 0">
              <th class="w-[8.6rem] align-top font-normal">Dimensions:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[2].primary.dimensions" /></th>
            </tr>
            <tr v-if="page.data.slices[2].primary.paper.length > 0">
              <th class="w-[8.6rem] align-top font-normal">Paper:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[2].primary.paper" /></th>
            </tr>
            <tr v-if="page.data.slices[2].primary.copyright.length > 0">
              <th class="w-[8.6rem] align-top font-normal">Copyright:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[2].primary.copyright" /></th>
            </tr>
            <tr v-if="page.data.slices[2].primary.isbn.length > 0">
              <th class="w-[8.6rem] align-top font-normal">ISBN:</th>
              <th class="font-normal"><prismic-rich-text :field="page.data.slices[2].primary.isbn" /></th>
            </tr>
          </tbody>
          <tbody v-for="(item, i) in page.data.slices[2].items" :key="`slice-item-${i}`">
            <tr>
              <th class="w-[8.6rem] align-top font-normal"><prismic-rich-text :field="item.title" /></th>
              <th class="font-normal"><prismic-rich-text :field="item.content" /></th>
            </tr>
          </tbody>
        </table>
        <!-- description -->
        <div @click="moretext = !moretext"
          :style="{ 'cursor': page.data.more_description.length > 0 ? 'pointer' : 'default' }"
          class="font-garamond text-base md:w-[25rem] pl-4 pr-4 md:pr-0 md:pl-0 group cursor-pointer">
          <prismic-rich-text :field="page.data.description"
            :style="{ 'text-indent': page.data.description[0].direction != 'ltr' ? '20px' : '0px' }"
            :class="{ 'no-after': moretext == true || !(page.data.more_description.length > 0) }"
            class="mt-9 md:mt-7
    [&>p]:after:content-['\20(...)'] md:[&>p]:after:content-['\20(...)\20read\20more'] [&>p]:after:text-[#BCBCBC] md:[&>p]:after:font-garamondit md:[&>p]:after:opacity-0 md:group-hover:[&>p]:after:opacity-100 md:[&>p]:after:transition-all" />
          <prismic-rich-text v-if="page.data.more_description.length > 0" :field="page.data.more_description" :style="{
            'text-indent': page.data.more_description[0].direction != 'ltr' ? '20px' : '0px',
            'max-height': moretext ? '99rem' : '0rem'
          }" class="[&>p]:min-h-[1rem] overflow-hidden transition-all" />
        </div>

        <!-- add to cart -->
        <prismic-rich-text :field="page.data.extra_line"
          class="font-cooperbt text-base tracking-[-0.01em] pt-7 md:pt-5 pl-5 md:pl-0" />
        <div class="text-sm text-[#6200FF] font-garamond pt-7 md:pt-5 pl-5 md:pl-0">
          <PrismicRichText :field="page.data.preordertext" />
        </div>
        <div v-if="page.data.price != null"
          class="font-cooperbt text-base tracking-[-0.01em] font-bold md:pb-5 pl-5 md:pl-0"><span
            v-if="page.data.old_price != null" class="text-[#FF0000] line-through decoration-2">€{{ page.data.old_price
            }}</span> €{{ page.data.price }},–</div>
        <form @submit="addToCart($event)" class="pl-5 md:pl-0 mt-1 md:mt-0 flex">
          <input type="hidden" name="uid" :value="page.id" />
          <button onclick="this.parentNode.querySelector('span').style.opacity = 1" v-if="page.data.status == 'ORDER'"
            class="font-metrik text-xs border w-min border-black rounded-full py-1 px-2 active:bg-sky-700 focus:cursor-no-drop hover:bg-sky-200">ORDER</button>
          <div v-if="page.data.status == 'PRE-ORDER'" class="flex h-min text-center items-center gap-[8px]">
            <div
              class="font-metrik text-xs border w-min border-black rounded-full py-1 px-2 opacity-[0.2] pointer-events-none">
              ORDER</div><button onclick="this.parentNode.parentNode.querySelector('span').style.opacity = 1"
              class="font-metrik text-xs border w-max border-black rounded-full py-1 px-2 active:bg-sky-700 focus:cursor-no-drop hover:bg-sky-200">PRE-ORDER</button>
          </div>
          <button onclick="this.parentNode.querySelector('span').style.opacity = 1"
            v-if="page.data.status == 'customize' && page.data.price != null"
            class="uppercase font-metrik text-xs border w-max border-black rounded-full py-1 px-2 active:bg-sky-700 focus:cursor-no-drop hover:bg-sky-200">{{ page.data.customized_text }}</button>
          <span class="ml-1 font-garamondit text-[#BCBCBC] text-lg transition-opacity opacity-0">Item has been added to
            cart</span>
        </form>

        <!--newsletter-->
        <form
          v-if="page.data.status == 'email' || page.data.status == 'customize' && page.data.price == null && page.data.customized_text != null"
          class="email-form pl-5 md:pl-0 mt-1 md:mt-0 text-sm" name="newsletter" method="POST" netlify
          netlify-honeypot="bot-field" action="/.netlify/functions/subscribeToMailjet">
          <label for="email" class="sr-only"> Email </label>
          <div>
            <input required type="email" name="email" id="email"
              :placeholder="page.data.status == 'customize' ? page.data.customized_text : 'Receive e-mail when in stock'"
              class="py-1 px-2 border w-max rounded-full" />
            <button type="submit"
              class="font-metrik border w-max border-black rounded-full py-1 px-2 active:bg-sky-700 focus:cursor-no-drop hover:bg-sky-200">Send</button>
          </div>
          <div class="hidden">
            <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
          </div>
        </form>

        <!-- number and title -->
        <div class="absolute md:static top-[62vh] pl-3 md:pl-0 pt-11 md:pt-0">
          <div :style="{ 'color': page.data.color }"
            class="md:absolute md:top-[calc(50vh+3.5rem)] right-[66.25vw] font-cooperbt text-[1.25rem] tracking-[-0.01em] flex pl-1 md:pl-0 items-center gap-0.5">
            <div :style="{ 'background-color': page.data.color }"
              class="rounded-full w-6 h-6 text-white flex justify-center items-center font-cooperbtmid tracking-[-0.08em]">
              <p :style="centerNumber(page.data.number)">{{ page.data.number }}</p>
            </div><prismic-rich-text :field="page.data.title" class="translate-y-0.5" />
          </div>
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
  async asyncData({ $prismic, params, store }) {
    const page = await $prismic.api.getByUID('product', params.uid)
    await store.dispatch('prismic/load')
    return {
      page
    }
  },
  data() {
    return {
    hoveredIndex:null,
      computedHeight: 0,
      components,
      intervall: null,
      window: {
        width: 0,
        height: 0
      },
      isMobile: false,
      sshowMobileMenu: false,
      speed: 5000,
      moretext: false
    }
  },
  head() {
    return {
      title: `${this.$prismic.asText(this.page.data.title)} | ${this.$prismic.asText(this.$store.state.prismic.settings.data.siteTitle)}`
    }
  },
  computed: {
    videoUrl() {
      if (this.page.data.slices[0].primary.vimeoid != null) {
        return `https://player.vimeo.com/video/${this.page.data.slices[0].primary.vimeoid}`;
      }
      else {
        return false
      }
    },
    video() {
      return this.page.data.slices[0].primary.video
    },
    mobileVideo() {
      return this.page.data.slices[2].primary.video
    },
    settings() {
      return this.$store.state.prismic.settings
    }
  },
  methods: {
    setHeight() {
      this.$nextTick(() => {
        const target = this.$refs.firsttable;
        if (target) {
          this.computedHeight = target.clientHeight;
        }
      });
    },
    centerNumber(e) {
      if (e > 9) {
        return 'transform: translate(-1.5px);'
      }
      switch (e) {
        case 8:
          return 'transform: translate(-1.25px);'
        case 4:
          return 'transform: translate(-1.5px);'
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
    ttimeToGo() {
      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      var b = this.page.data.preorderlaunchdate.split(/[-TZ:]/i)
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
      const all = document.getElementsByClassName('alpercounter')
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
    removeDuplicates(data) {
      return [...new Set(data)]
    },
    playSoundEffect() {
      const sound = this.settings.data.add_to_cart_sound
      if (sound.link_type == "Media") {
        new Audio(sound.url).play()
      }
    },
    addToCart(event) {
      event.preventDefault();
      this.playSoundEffect()
      const form = new FormData(event.target);
      var orderList = []
      if (localStorage.orders) {
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
      if (window.innerWidth < 640 || window.innerHeight < 640) {
        this.isMobile = true
      } else { this.isMobile = false }
    }
  },
  name: 'MyComponent',
  components: { VueSlickCarousel },

  mounted() {
    this.setHeight();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    if (this.page.data.preorderlaunchdate) {
      this.ttimeToGo();
      this.intervall = setInterval(this.ttimeToGo, 1000)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.intervall);
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

.slick-dots {
  max-height: 36px;
  overflow: hidden;
}

.no-after p::after {
  display: none;
}
</style>