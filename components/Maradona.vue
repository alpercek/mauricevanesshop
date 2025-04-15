<template>
  <div>
    <div @click="$emit('goToSite')" :style="{'color':settings.data.splashcolor}" class="relative z-20 inset-0 h-screen">
      <button class="cursor-pointer hidden md:block text-[2.5rem] text-white font-cooperbtbold absolute left-1/2 -translate-x-1/2 bottom-0 pb-[1.75rem]" 
        style="text-shadow: black 2px 2px; text-stroke: 1px black; -webkit-text-stroke: 1px black;">go to site</button>

      <div class="scale-[0.6] md:scale-100 absolute bottom-0 left-0 origin-bottom-left">
        <div class="-translate-x-[32%] -translate-y-[75%]">
        <div class="font-platform bg-[#FF0000] border border-black border-[2px] h-[5.313rem] w-[36.875rem] flex justify-center items-center rotate-45">
          <h1 class="neon-text">PRE-ORDER</h1>
        </div>
      </div>
    </div>
    
  <div class="absolute left-[13vw] bottom-[13vh] md:left-[164px] md:bottom-[145px] scale-90">
    <div id="Awesome" class="anim750">
      <div class="reveal circle_wrapper">
		    <div class="circle text-5xl text-white font-marudemi">€69</div>
	    </div>
			<div class="sticky anim750">
		    <div id="front" class="front circle_wrapper anim750">
			    <div class="circle anim750"></div>
	      </div>
	    </div>
      <h4 id="cost85" class="text-white text-5xl reveal circle font-marudemi">€85</h4>
			<div class="sticky anim750">
		    <div id="back" class="back circle_wrapper anim750">
			    <div class="circle anim750"></div>
		    </div>
	    </div>
		</div>
  </div>

<div class="absolute left-0 top-[50vh] md:top-auto md:bottom-[136px] w-screen text-left md:text-center pointer-events-none pl-[28px] pl-0">
  <div class="text-[42px] md:text-[72px] font-venus text-[#FFEB00] leading-[39px]"  style="text-stroke: 1px #FF0000; -webkit-text-stroke: 1px #FF0000;">Pre-Sale Open – Book Launch in</div>
  <div ref="counter" class="text-[11vw] md:text-[72px] font-maru text-white space-x-4"  style="text-shadow: black 2px 2px;"><span></span><span></span><span></span></div>
</div>

  <div class="absolute bottom-[13vh] md:bottom-[76px] w-[150px] md:w-auto right-[82px] md:left-[265px] text-white text-[16px] md:text-[18px] font-marudemi">
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
      const images = [require('@/static/maradona/0.png'),
      require('@/static/maradona/1.jpg'),
      require('@/static/maradona/2.jpg'),
      require('@/static/maradona/3.jpg'),
      require('@/static/maradona/4.jpg')]
     return images[Math.floor(Math.random() * images.length)]
    },
    msrc(){
      const images = [require('@/static/maradona/mobile0.png')]
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
      const elements = document.getElementsByClassName('anim750')
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add('peel')
      }
	  document.getElementById('cost85').style.opacity = '0'
    setTimeout(() => {
      document.getElementById('front').remove()
      document.getElementById('back').remove()
    }, 750)
      }, 4000)
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
.anim750{
  transition: all 750ms ease-in-out;
}

#Awesome{
	position: relative;
	width: 180px;
	height: 180px;
	margin: 0 auto;
  
  backface-visibility: hidden;
}

#Awesome .sticky{
	transform: rotate(45deg);
}

#Awesome:hover .sticky{
	transform: rotate(10deg);
}

#Awesome .sticky{
	position: absolute;
	top: 0;
	left: 0;
	width:180px;
	height: 180px;
}

#Awesome .reveal .circle{

  line-height: 140px;
  text-align: center;
  text-shadow: black 0px 0px 7px;
  cursor: pointer;
}

#Awesome .circle_wrapper{
	position: absolute;
	width: 180px;
	height: 180px;
	left: 0px;
	top: 0px;
	overflow: hidden;
}

#Awesome .circle{
	position: absolute;
	width: 140px;
	height:  140px;
	margin: 20px;
	
	border-radius: 999px;
}

#Awesome .back{
	height: 10px;
	top: 30px;
}

#Awesome:hover .back{
	height: 90px;
	top: 110px;
}

#Awesome .back .circle{
	margin-top: -130px;
	background-color: #f1c8c8;

	background-image: -webkit-linear-gradient(bottom, rgba(251,236,63,.0), rgba(255,255,255,.8));
}

#Awesome:hover .back .circle{
	margin-top: -50px;
}

#Awesome .front{
	height: 150px;
	bottom: 0;
	top: auto;
	box-shadow: 0 -140px 20px -140px rgba(0,0,0,.3);
	-webkit-box-shadow: 0 -140px 20px -140px rgba(0,0,0,.3);
}

#Awesome:hover .front{
	height: 70px;
	box-shadow: 0 -60px 10px -60px rgba(0,0,0,.1);
	-webkit-box-shadow: 0 -60px 10px -60px rgba(0,0,0,.1);
}

#Awesome .front .circle{
	margin-top: -10px;
	background: #FF0000;

	background-image: -webkit-linear-gradient(bottom, rgba(251,236,63,.0) 75%, #f7bb37 95%);
  background-image: -moz-linear-gradient(bottom, rgba(251,236,63,.0) 75%, #f7bb37 95%);
  background-image: linear-gradient(bottom, rgba(251,236,63,.0) 75%, #f7bb37 95%);
}

#Awesome h4{
  text-align: center;
	position: absolute;
	width: 180px;
	height: 140px;
  line-height: 140px;
	
	transition: opacity 50ms linear 400ms;
}

#Awesome:hover h4{
	opacity: 0;
	transition: opacity 50ms linear 300ms;
}

#Awesome:hover .front .circle{
	margin-top: -90px;
	background-color: #FF0000;
	background-position: 0 100px;
}



#Awesome .peel .sticky{
	transform: rotate(10deg);
}
#Awesome .peel h4{
	opacity: 0;
	transition: opacity 50ms linear 300ms;
}

#Awesome .peel .front .circle{
	margin-top: -90px;
	background-color: #FF0000;
	background-position: 0 100px;
}
#Awesome .peel .back{
	height: 90px;
	top: 110px;
}

#Awesome .peel .back .circle{
	margin-top: -50px;
}

#Awesome .peel .front{
	height: 70px;
	box-shadow: 0 -60px 10px -60px rgba(0,0,0,.1);
	-webkit-box-shadow: 0 -60px 10px -60px rgba(0,0,0,.1);
}

#doron{
  color: white;
  -webkit-animation: h2 0.35s infinite; 
  animation: h2 1s infinite;
}
@-webkit-keyframes h2 {
    0%   {text-shadow: 0 0 6px #FFF;}
    100%  {text-shadow: 0 0 0px #000;}
}
@keyframes h2 {
    0%   {text-shadow: 0 0 6px #FFF;}
    100%  {text-shadow: 0 0 0px #000;}
}
</style>