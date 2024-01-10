import MyComponent from '../../../../slices/BookInfo';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/BookInfo'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"authors":[{"type":"paragraph","text":"Nulla consequat magna ipsum tempor velit officia excepteur incididunt. Lorem consectetur velit laboris exercitation eiusmod consectetur elit enim sunt Lorem aliqua eiusmod laborum. Minim tempor est consequat est elit sint est dolor laborum nostrud elit tempor aliquip duis ullamco.","spans":[]}],"year":[{"type":"paragraph","text":"Laborum laborum id adipisicing.","spans":[]}],"isbn":[{"type":"paragraph","text":"Excepteur exercitation voluptate ut ullamco duis do laborum. Anim incididunt anim esse id non.","spans":[]}],"language":[{"type":"paragraph","text":"Elit nulla enim Lorem voluptate occaecat magna amet consequat fugiat in.","spans":[]}]},"id":"_Default","slice_type":"book_info"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
