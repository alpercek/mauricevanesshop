<template>
  <div>
    <div @click="$emit('goToSite')" :style="{'color':settings.data.splashcolor}" class="relative z-20 inset-0 h-screen">


      <img class="absolute md:h-[19px] md:top-[848px] md:left-[1641px] w-[169px] right-[27px] top-[48vh] z-30" src="@/static/maradona/SVG/r.svg"/>
      <img class="absolute h-[32px] top-[82px] left-[329px] w-[287px] hidden md:block" src="@/static/maradona/SVG/rr.svg"/>
      <img class="absolute h-[47px] top-[35vh] left-[46px] w-[241px] z-30 md:hidden" src="@/static/maradona/SVG/rrr.svg"/>


      <img class="absolute md:h-[158px] h-[10vh] md:top-[60px] md:left-[27px] md:w-[186px] right-[21px] bottom-[18px]" src="@/static/maradona/SVG/num10.svg"/>
      <img class="absolute h-[39px] md:top-[38px] md:left-[1618px] w-[106px] z-30 right-[48px] top-[70px]" src="@/static/maradona/SVG/nue.svg"/>
      <img class="absolute h-[66px] top-[126px] left-[332px] w-[129px] hidden md:block" src="@/static/maradona/SVG/new.svg"/>

      <img class="absolute top-[144px] left-[27px] w-[calc(100vw+20px)] object-cover object-left hidden md:block" src="@/static/maradona/SVG/maradona.svg"/>
      <img class=" absolute w-[calc(100vw+23px)] left-[0px] top-[10vh] -translate-y-[17px] object-cover object-bottom z-20 md:hidden" src="@/static/maradona/SVG/maramob.svg"/>

      <button class="cursor-pointer hidden md:block text-[2.5rem] text-white font-cooperbtbold absolute left-1/2 -translate-x-1/2 bottom-0 pb-[1.75rem]" 
        style="text-shadow: black 2px 2px; text-stroke: 1px black; -webkit-text-stroke: 1px black;">go to site</button>

      <div class="scale-[0.6] md:scale-100 absolute bottom-0 left-0 origin-bottom-left">
        <div class="-translate-x-[32%] -translate-y-[75%]">
        <div class="font-platform bg-[#FF0000] border border-black border-[2px] h-[5.313rem] w-[36.875rem] flex justify-center items-center rotate-45">
          <h1 class="neon-text">PRE-ORDER</h1>
        </div>
      </div>
    </div>
    
    <div class="absolute left-[13vw] bottom-[13vh] md:left-[164px] md:bottom-[100px]
    grid items-center justify-items-center animscale">
      <div style="grid-column: 1; grid-row: 1;" class="z-10 spin"><img ref="stickerbg" class="h-[120px] md:h-[150px]" src="@/static/maradona/SVG/circle.svg" /></div>
      <div style="grid-column: 1; grid-row: 1; text-shadow: #000 0 0 7px" class=" text-[38.4px] md:text-5xl text-white font-marudemi z-20 flex items-center"><div class="text-[25.6px] md:text-[32px] pb-[3px] ">€</div><div ref="stickerprice">85</div></div>
    </div>

<div class="absolute left-0 top-[55vh] md:top-auto md:bottom-[30vh] lg:bottom-[136px] w-screen text-left md:text-center pl-[28px] pl-0">
  <div class="text-[29.4px] md:text-[72px] font-venus text-[#FFEB00] leading-[27.3px] md:leading-[70px]"  style="text-stroke: 1px #FF0000; -webkit-text-stroke: 1px #FF0000;">Pre-Sale Open – Book Launch in</div>
  <div ref="counter" class="text-[7.7vw] md:text-[72px] font-maru text-white space-x-4"  style="text-shadow: black 2px 2px;"><span></span><span></span><span></span></div>
</div>

  <div class="absolute bottom-[16vh] md:bottom-[76px] w-[150px] md:w-auto right-[42px] md:left-[265px] text-white text-[16px] md:text-[18px] font-marudemi">
    <h2 id="doron">pre-sale discount first 200 books*</h2>
  </div>

      <img :src="src" class="h-screen w-screen object-cover hidden md:block" />
      <img :src="msrc" class="h-screen w-screen object-cover md:hidden" />

      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      interval: null
  }
  },
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  computed:{
    src(){
      const images = [require('@/static/maradona/0.jpg'),
      require('@/static/maradona/1.jpg'),
      require('@/static/maradona/2.jpg'),
      require('@/static/maradona/3.jpg')]
     return images[Math.floor(Math.random() * images.length)]
    },
    msrc(){
      const images = [require('@/static/maradona/mobile0.jpg'),
      require('@/static/maradona/mobile1.jpg'),
      require('@/static/maradona/mobile2.jpg'),
      require('@/static/maradona/mobile3.jpg'),
      require('@/static/maradona/mobile4.jpg'),
      require('@/static/maradona/mobile5.jpg'),
      require('@/static/maradona/mobile6.jpg')
      ]
     return images[Math.floor(Math.random() * images.length)]
    }
  },
  mounted(){
    this.peel()
    this.timeToGo()
    this.interval = setInterval(this.timeToGo, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods:{
  peel(){
    setTimeout(() => {
      this.$refs.stickerprice.innerText = "69"
      this.$refs.stickerbg.src= require('@/static/maradona/SVG/star.svg')
      }, 4250)
  },
	timeToGo(){
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

	var b = this.settings.data.eventlaunchtime.split(/[-TZ:]/i)
	var d = new Date(Date.UTC(b[0], --b[1], b[2]))
    // Utility to add leading zero
    function z(n) {
      return (n < 10? '0' : '') + n;
    }

    // Convert string to date object
    var diff = d - new Date();

    // Allow for previous times
    var sign = diff < 0? '-' : '';
    diff = Math.abs(diff);

    // Return formatted string
    this.$refs.counter.children[0].innerText = sign + 'D:' + z(Math.floor(diff / (day)));
    this.$refs.counter.children[1].innerText = 'H:' + z(Math.floor((diff % (day)) / (hour)));
    this.$refs.counter.children[2].innerText ='S:' + z(Math.floor((diff % (minute)) / second));
	}
  }
}
</script>
<style scoped>
.animscale{
  animation: scale 1s linear 3.9s 1 normal both;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.spin{
  transform-origin: center;
  animation: spin 8s linear 4s infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.neon-text {
    font-size: 4rem;
    color: #FCEE21;
    text-stroke: 1px #0000FF; 
    -webkit-text-stroke: 1px #0000FF;
    text-shadow: 0 0 5px #ffffff, 0 0 1px #ffffff, 0 0 2px #ffffff, 0 0 4px #ffffff, 0 0 8px #ffffff;
    animation: glow 2.5s infinite alternate;
}

@keyframes glow {
    0% {
        text-shadow: 0 0 1px #f7f6d3, 0 0 1px #f7f6d3, 0 0 2px #f7f6d3, 0 0 4px #f7f6d3, 0 0 8px #f7f6d3;
    }
    50% {
        text-shadow: 0 0 2px #ffee00, 0 0 2px #ffee00, 0 0 4px #ffee00, 0 0 8px #ffee00, 0 0 16px #ffee00;
    }
    100% {
        text-shadow: 0 0 1px #f7f6d3, 0 0 1px #f7f6d3, 0 0 2px #f7f6d3, 0 0 4px #f7f6d3, 0 0 8px #f7f6d3;
    }
    
}
</style>