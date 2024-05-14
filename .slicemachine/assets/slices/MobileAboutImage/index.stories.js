import MyComponent from '../../../../slices/MobileAboutImage';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/MobileAboutImage'
}


export const _Default = () => ({
  components: {
    MyComponent,
    SliceZone
  },
  methods: {
    resolve() {
      return MyComponent
    }
  },
  data() {
    return {
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"image":{"dimensions":{"width":3199,"height":3199},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1600804931749-2da4ce26c869"},"fig":[{"type":"paragraph","text":"Exercitation ad Lorem laboris id dolor aliquip aliqua sunt consectetur enim ullamco commodo.","spans":[]}]}],"primary":{},"id":"_Default","slice_type":"mobile_about_image"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
