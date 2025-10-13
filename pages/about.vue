<template>
  <div class="pb-32">
    <SliceZone :slices="page.data.slices" :components="components" />
    <!--newsletter-->
    <form class="pl-9 md:pl-40 email-form font-cooperbt pt-5" name="newsletter" method="POST" netlify netlify-honeypot="bot-field" action="/.netlify/functions/subscribeToMailjet">
  <label for="email" class="sr-only"> Email </label>
  <div class="">
    <input required type="email" name="email" id="email" placeholder="Sign up for newsletter" class="py-1 px-2 rounded-full" />
    <button type="submit" class="border rounded-full border-black py-1 px-2 active:!bg-[#F8F18B] md:hover:bg-[#FCEE22]">Sign Up</button>
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
