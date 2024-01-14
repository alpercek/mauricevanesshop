<template>
  <div class="bg-white px-4 overflow-hidden pb-7 pt-9 md:pt-0 pl-9 md:pl-40">
    <div>
      <div class="max-w-sm grid grid-cols-1 items-center justify-items-start">
        <a :href="'mailto:' + $prismic.asText(slice.primary.email)"><PrismicRichText :field="slice.primary.email"  class="text-sm font-cooperbt hover:underline"/></a>
        <div class="text-sm font-cooperbt flex "><a :href="'https://www.instagram.com/' + $prismic.asText(slice.primary.instagram)" class="hover:underline"> @{{ $prismic.asText(slice.primary.instagram) }}</a></div>
      </div>
        <a :href="'http://' + $prismic.asText(slice.primary.website)"><PrismicRichText :field="slice.primary.website" class="text-sm font-cooperbt hover:underline"/></a>
        </div>
      </div>
</template>

<script>
import { getSliceComponentProps } from '@prismicio/vue/components'


export default {
  
  // The array passed to `getSliceComponentProps` is purely optional.
  // Consider it as a visual hint for you when templating your slice.
  props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
 
}

</script>
<style>
p{
  margin-bottom: 0px !important;
}

</style>