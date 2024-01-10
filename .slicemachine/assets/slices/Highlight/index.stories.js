import MyComponent from '../../../../slices/Highlight';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Highlight'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{},"id":"_Default","slice_type":"highlight"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
