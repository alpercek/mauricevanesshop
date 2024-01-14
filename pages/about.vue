<template>
  <div>
    <SliceZone :slices="page.data.slices" :components="components" />
    <form class="w-full email-form" name="newsletter" method="POST" netlify netlify-honeypot="bot-field" action="/.netlify/functions/subscribeToMailjet">
      <!--newsletter-->
  <label for="email" class="sr-only"> Email </label>
  <div class="border border-gray-100 p-2 focus-within:ring sm:flex sm:items-center sm:gap-4">
    <input required type="email" name="email" id="email" placeholder="Enter your email address..." class="w-full border-none focus:border-transparent focus:ring-transparent" />
    <button type="submit" class="mt-1 w-full bg-teal-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0">Sign Up</button>
  </div>
  <div class="hidden">
    <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
  </div>
</form>
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
