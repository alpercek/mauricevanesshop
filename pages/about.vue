<template>
  <div>
    <SliceZone :slices="page.data.slices" :components="components" />
  </div>
</template>

<script>
import { components } from '~/slices'

export default {
  async asyncData ({ $prismic, store }) {
    const page = await $prismic.api.getByUID('page', 'about')
    await store.dispatch('prismic/load')
    return {
      page
    }
  },
  data () {
    return { components, 
    }
    
  },
  head () {
    return {
      title: this.$prismic.asText(this.page.data.title)
    }
  },
  methods: { 
},
mounted(){
  }
}
</script>
