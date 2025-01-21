<template>
    <div class="pb-32">
     {{ page[0] }}
    </div>
  </template>
  
  <script>
  import { components } from '~/slices'
  
  export default {
    async asyncData ({ $prismic, store }) {
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
    data () {
      return { components, 
      }
      
    },
    head () {
    },
    methods: { 
  },
  mounted(){
    }
  }
  </script>
  