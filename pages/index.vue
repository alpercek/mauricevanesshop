<template>
  <div>
    {{ page.data.linked[0].link }}
  </div>
</template>

<script>
import { components } from '~/slices'

export default {
  async asyncData ({ $prismic, store }) {
    const page = await $prismic.api.getByUID('page', 'home')
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
      title: this.$prismic.asText(this.page.data.title)
    }
  },
  methods: {
},
mounted(){
  }
}
</script>
