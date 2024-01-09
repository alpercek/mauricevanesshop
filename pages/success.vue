<template>
  <div>success!</div>
</template>

<script>
import { doc } from 'prettier'
import { components } from '~/slices'

export default {
  async asyncData ({ $prismic, store }) {
    const page = await $prismic.api.getByUID('page', 'home')
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
  toTop() {
    window.scrollTo({
  top: 0,
  left: 0,
  behavior: "smooth",
});
  },
  sakla(){
        event.target.parentElement.style.display = "none"
      },

},
mounted(){
  
      var lastScrollTop = 0;
      let set = document.getElementsByClassName("set")
      let sat = document.getElementById("se")
      let imt = document.getElementById("itr")
      let imtt = document.getElementById("itrr")
      let tt = document.getElementById("tt")
document.getElementById("cb").addEventListener("click", function(){sat.style.display = "none"})

document.getElementById("fff").addEventListener('mousemove', function(){
      document.getElementById("fff").scrollTo({
  top: `${event.y}`/(window.innerHeight*2)*10000,
  left: `${event.x}`/(window.innerWidth*2)*10000,
});
    });

    document.getElementById("misss").addEventListener("click", function(){
    document.getElementById("fff").style.display = "block"
  
  },false);



document.addEventListener("scroll", function(){ 
   var st = window.pageYOffset || document.documentElement.scrollTop; 
   if (st > lastScrollTop) {
    document.getElementById("topitop").style.opacity = 0
   } else if (st < lastScrollTop) {
    document.getElementById("topitop").style.opacity = 1
   }
   lastScrollTop = st <= 0 ? 0 : st;

}, false);
  for (let index = 0; index < set.length; index++) {
    set[index].addEventListener("click", function enlarge(){
    imt.src = event.currentTarget.src
    imtt.src = event.currentTarget.src
    sat.style.display = "block"
    tt.innerHTML = event.currentTarget.parentElement.parentElement.lastChild.innerHTML
    console.log(event.currentTarget.parentElement.parentElement.lastChild.innerHTML)
    })
  }
  
  }
}
</script>
