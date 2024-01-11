<template>
  <div class="pb-32">
  <div class="grid grid-cols-3 px-[7vw] gap-x-4 gap-y-12">
    <div v-for="(item, i) in page.results" :key="`slice-item-${i}`" class="" v-if="i != 0">
    <NuxtLink :to="'/'+item.uid">
    <PrismicImage :field="item.data.image" class=" h-[38.5vw] w-full border object-cover"/>
    <div :style="{'color':item.data.color}" class="flex justify-center pt-5 font-cooperbt text-xl"><prismic-rich-text :field="item.data.littlenumber" class="" /><prismic-rich-text :field="item.data.title" class="" /></div>
    </NuxtLink>
  </div>
</div>
</div>
</template>

<script>
import { components } from '~/slices'

export default {
  async asyncData ({ $prismic, store }) {
    const page = await $prismic.api.query(
      $prismic.predicates.at('document.type','product')
    )
    await store.dispatch('prismic/load')
    return {
      page
    }
  },
  data () {
    return { components, }
    
  },
  head () {
    return {
    }
  },
  methods: {
},
mounted(){
  }
}
</script>
