import MyComponent from '../../../../slices/ContactInfo';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ContactInfo'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"instagram":[{"type":"paragraph","text":"Enim minim nostrud anim veniam consequat fugiat aliqua eiusmod reprehenderit veniam in ex adipisicing. Cupidatat dolor non eu nulla Lorem non enim aliqua duis qui non duis est culpa. Et enim aliquip aute commodo occaecat fugiat adipisicing sint veniam tempor.","spans":[]}],"website":[{"type":"paragraph","text":"Mollit amet laboris amet deserunt commodo ullamco consequat voluptate qui amet. Sit veniam adipisicing ea exercitation ea.","spans":[]}],"email":[{"type":"paragraph","text":"Dolore mollit culpa est tempor pariatur aliqua tempor ex dolor consectetur pariatur.","spans":[]}]},"id":"_Default","slice_type":"about_info"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
