<template>
  <div class="relative pb-32">
    <SliceZone :slices="page.data.slices" :components="components" />
    <div>
      <div class="ml-[43vw] pt-7">
    <prismic-rich-text :field="page.data.description" class="font-garamond text-sm w-[25rem]" />
    <prismic-rich-text :field="page.data.extra_line" class="font-cooperbt text-sm tracking-[-0.01em] pt-5"/>
    <div class="font-cooperbt text-sm tracking-[-0.01em] font-bold pb-5">€{{ page.data.price }},–</div>
    <div class="font-metrik text-xs border w-min border-black rounded-full py-1 px-2 hover:bg-sky-200">ORDER</div>
      </div>
    <div :style="{'color':page.data.color}" class="absolute top-[39.5rem] right-[66.25vw] font-cooperbt text-lg tracking-[-0.01em] flex"><prismic-rich-text :field="page.data.littlenumber" class="text-2xl pr-1"/> <prismic-rich-text :field="page.data.title" class="translate-y-0.5"/></div>
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
},
mounted(){
}
}
</script>
