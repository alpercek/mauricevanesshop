<template>
  <div class="pl-40 bg-white px-4 overflow-hidden">
    <div>
      <div class="max-w-sm md:max-w-sm grid grid-cols-1 md:justify-items-stretch items-center gap-4 justify-items-start text-lg font-garamond md:text-sm !leading-5"><div v-for="(item, i) in slice.items" :key="`slice-item-${i}` ">    
          <PrismicRichText :field="item.text" />
        </div></div></div>
      </div>
</template>

<script>
import { getSliceComponentProps } from '@prismicio/vue/components'

export default {
  data(){
    return{
    sshowMobileMenu: false
    }
  },
  // The array passed to `getSliceComponentProps` is purely optional.
  // Consider it as a visual hint for you when templating your slice.
  props: getSliceComponentProps(['slice', 'index', 'slices', 'context'])
}
</script>
<style>
p{
  margin-bottom: 0px !important;
}
.aaactive{
  max-height: 200rem;
}

</style>