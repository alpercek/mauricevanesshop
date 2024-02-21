<template>
  <div class="font-metrik text-xs md:px-48 px-4 pt-32">E-mail sign-up successful. Click <NuxtLink to="/" class="border w-min border-black rounded-full py-1 px-2 active:bg-sky-700 hover:bg-sky-200">HERE</NuxtLink> to go to the home page.</div>
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
      title: 'Purchase Successful'
    }
  },
mounted(){
}
}
</script>
