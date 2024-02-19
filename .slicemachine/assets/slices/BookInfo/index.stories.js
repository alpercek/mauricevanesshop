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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"title":[{"type":"paragraph","text":"Consequat esse laboris deserunt id voluptate esse duis irure veniam nostrud eu dolore consequat. Commodo nulla dolore amet amet cupidatat quis tempor occaecat mollit aliquip nostrud labore duis Lorem et.","spans":[]}],"content":[{"type":"paragraph","text":"Nostrud elit velit deserunt Lorem tempor irure culpa voluptate veniam. Nostrud duis minim fugiat dolor veniam.","spans":[]}]}],"primary":{"year":[{"type":"paragraph","text":"Laborum laborum id adipisicing.","spans":[]}],"edition":[{"type":"paragraph","text":"Adipisicing ex tempor aute id voluptate duis ipsum id et nostrud ut qui id.","spans":[]}],"pages":[{"type":"paragraph","text":"Magna irure aliqua labore nostrud aliquip nostrud mollit cupidatat mollit consectetur velit.","spans":[]}],"dimensions":[{"type":"paragraph","text":"Laborum aute ipsum mollit officia sunt nisi cupidatat ad ea proident laborum id. Magna minim voluptate aliqua velit sit amet duis commodo excepteur.","spans":[]}],"paper":[{"type":"paragraph","text":"Ex et incididunt mollit exercitation eu elit mollit mollit culpa anim.","spans":[]}],"copyright":[{"type":"paragraph","text":"Nisi commodo consectetur occaecat ullamco dolore duis quis magna culpa minim adipisicing.","spans":[]}],"isbn":[{"type":"paragraph","text":"Excepteur exercitation voluptate ut ullamco duis do laborum. Anim incididunt anim esse id non.","spans":[]}]},"id":"_Default","slice_type":"book_info"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
