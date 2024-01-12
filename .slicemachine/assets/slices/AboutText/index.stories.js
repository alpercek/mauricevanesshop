import MyComponent from '../../../../slices/AboutText';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/AboutText'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"text":[{"type":"paragraph","text":"Excepteur ut commodo do ullamco aute officia mollit Lorem dolor nostrud fugiat mollit nostrud anim.","spans":[]}]}],"primary":{},"id":"_Default","slice_type":"about_text"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''

export const _Date = () => ({
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
      mock: {"variation":"date","version":"sktwi1xtmkfgx8626","items":[{"date":[{"type":"paragraph","text":"Elit quis sint est duis est in aliquip incididunt est. Occaecat deserunt consectetur sit cupidatat laborum sit.","spans":[]}],"text":[{"type":"paragraph","text":"Proident adipisicing officia tempor amet voluptate excepteur exercitation proident. Elit aliqua deserunt elit minim.","spans":[]}]}],"primary":{"title":[{"type":"paragraph","text":"Eu culpa qui veniam eu do sint laborum elit commodo Lorem esse. Ad est tempor amet magna proident fugiat dolore ut nisi qui officia proident ipsum quis. Quis eiusmod eiusmod magna dolore ut id id excepteur excepteur amet ut adipisicing.","spans":[]}]},"id":"_Date","slice_type":"about_text"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Date.storyName = ''
