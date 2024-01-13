<template>
  <div class="relative pb-32">
    <SliceZone :slices="page.data.slices" :components="components" />
    <div>
      <div class="md:ml-[43vw] pt-9 md:pt-7">
    <prismic-rich-text :field="page.data.description" class="font-garamond text-sm w-[25rem] pl-4 md:pl-0" />
    <prismic-rich-text :field="page.data.extra_line" class="font-cooperbt text-sm tracking-[-0.01em] pt-7 md:pt-5 pl-5 md:pl-0"/>
    <div class="font-cooperbt text-sm tracking-[-0.01em] font-bold pb-5 pl-5 md:pl-0">€{{ page.data.price }},–</div>
    <div class="absolute md:static top-[62vh] pl-3 md:pl-0 pt-11 md:pt-0">
    <form @submit="addToCart($event)">
    <input type="hidden" name="uid" :value="page.id" />
    <button class="font-metrik text-xs border w-min border-black rounded-full py-1 px-2 active:bg-sky-700 focus:cursor-no-drop hover:bg-sky-200">ORDER</button>
    </form>
    <div :style="{'color':page.data.color}" class="md:absolute md:top-[39.5rem] right-[66.25vw] font-cooperbt text-lg tracking-[-0.01em] flex pt-6 md:pt-0 pl-1 md:pl-0"><prismic-rich-text :field="page.data.littlenumber" class="text-2xl pr-1"/> <prismic-rich-text :field="page.data.title" class="translate-y-0.5"/></div>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
import { components } from '~/slices'

export default {
  async asyncData ({ $prismic, params, store }) {
    const page = await $prismic.api.getByUID('product', params.uid)
    await store.dispatch('prismic/load')
    return {
      page
    }
  },
  data () {
    return { components }
  },
  head () {
    return {
      title: `${this.$prismic.asText(this.page.data.title)} | ${this.$prismic.asText(this.$store.state.prismic.settings.data.siteTitle)}`
    }
  },
  methods: { 
    addToCart (event) {
      event.preventDefault();
      const form = new FormData(event.target);
      var orderList = []
      if(localStorage.orders){
        orderList = JSON.parse(localStorage.orders)
      }
      orderList.push(form.get('uid'))
      localStorage.orders = JSON.stringify(orderList)
      document.getElementsByClassName('counter')[0].innerText = orderList.length
      document.getElementsByClassName('counter')[1].innerText = orderList.length
    }
},
mounted(){
}
}
</script>
