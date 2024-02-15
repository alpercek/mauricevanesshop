<template>
    <div>
      <div class="md:px-12 px-9">
        <div class="pt-3.5 flex gap-2.5 justify-between text-lg font-garamond border-b border-black"><p class="w-40 text-center">Item</p> <p class="w-20 text-center">Quantity</p> <p class="w-20 text-center">Price</p></div>
        <div class="pt-5 space-y-4 pb-6">
        <div v-for="(item, i) in filtered" :key="`slice-item-${i}`" class="flex gap-2.5 font-garamond justify-between">
    <div class="w-40 md:w-auto text-center font-cooperbt text-sm tracking-[-0.02em] flex justify-center">
      <PrismicImage :field="item.data.image" class=" h-[100px] w-[100px] border object-cover hidden md:block"/>
      <div><div :style="{'background-color':item.data.color}" class="rounded-full w-5 h-5 text-white m-auto">{{ item.data.number }}</div><prismic-rich-text :style="{'color':item.data.color}" :field="item.data.title" /></div>
    </div>
        <div class="w-20 text-center">
          <input
            type="number"
            class="quantity"
            value="1"
            min="1"
            max="10"
          />
        </div>
        <p class="w-20 text-center">{{item.data.price}}</p> 
        <div class="absolute right-0 mr-5">
          <form @submit="remove($event)">
          <input type="hidden" name="id" :value="item.id" />
          <button class="font-metrik text-xs" type="submit">╳</button>
          </form>
        </div>
  </div>
</div>

<div class="border-y border-black pt-4 pb-5 text-right font-garamond text-lg pr-3.5">Total<span class="pl-9 underline">{{ sum }}</span></div>

        <form @submit="handleSubmit($event)" action="/.netlify/functions/create-checkout" method="post" class="pt-8">
          <label for="shipping" class="font-garamond text-lg">Shipping destination:</label>
          <select id="shipping" name="shipping" class="font-garamond text-lg w-[calc(100vw-14rem)] truncate">
            <option v-if="cntry = countries.find(a=>a.code==item.code)" v-for="(item, i) in shipping.data.list" :key="`slice-item-${i}`" :value="item.code">{{ cntry.name }}</option>
          </select>
          <input type="hidden" name="sku" value="DEMO002" />
          <button id="asdf" class="font-metrik text-base border border-black rounded-full py-1 px-2 hover:bg-sky-200 hidden mt-12 mx-auto" type="submit">CHECKOUT</button>
        </form>
        <div id="sdf" class="font-metrik text-xs">There are no items in the cart. Hit the <NuxtLink to="/" class="border w-min border-black rounded-full py-1 px-2 active:bg-sky-700 hover:bg-sky-200">ORDER</NuxtLink> button in product pages to add items to the cart.</div>
      </div>
    </div>
  </template>
  
  <script>
  import { components } from '~/slices'
  import countries from '../static/countries.json'
  
  export default {
    async asyncData ({ $prismic, store }) {
      const page = await $prismic.api.query(
      $prismic.predicates.at('document.type','product')
    )
      await store.dispatch('prismic/load')
      return {
        page
      }
    },

    data () {
      return { components, 
        filtered: [],
        ids: [],
        countries,
        sum: 0
      }
      
    },
    head () {
      return {
        title: 'Checkout'
      }
    },
    computed: {
    shipping() {
      return this.$store.state.prismic.shipping
    }
},
    methods: {
        remove(event){
          event.preventDefault();
          const form = new FormData(event.target)
          const target = form.get('id')
          const itemarray = JSON.parse(localStorage.orders)
          var index = itemarray.indexOf(target);
          if (index !== -1) {
          itemarray.splice(index, 1);
          }
          localStorage.orders = JSON.stringify(itemarray)
          this.load()
          if (itemarray.length == 0) {
            event.target.parentElement.parentElement.remove()
          }
          document.getElementsByClassName('counter')[0].innerText = itemarray.length
          document.getElementsByClassName('counter')[1].innerText = itemarray.length
          if (itemarray.length == 0) {
            document.getElementById('asdf').style.display = 'none'
            document.getElementById('sdf').style.display = 'block'
          }
        },

        format(amount, currency) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency,
        }).format((amount / 100).toFixed(2));
      },
        async handleSubmit(event) {
        event.preventDefault();
        document
          .querySelectorAll('button')
          .forEach((button) => (button.disabled = true));
        const quantity = []
        document.getElementsByClassName('quantity').forEach((element) => quantity.push(element.value))
        const form = new FormData(event.target);
        const data = {
          orders: this.ids, 
          quantity: quantity,
          ship: form.get('shipping')
        };
        console.log(data)
        const response = await fetch('/.netlify/functions/create-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then((res) => res.json());

        const stripe = Stripe(response.publishableKey);
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.sessionId,
        });

        if (error) {
          document
            .querySelectorAll('button')
            .forEach((button) => (button.disabled = false));
          console.error(error);
        }
      },
      total() {
        this.sum = 0
        for (let i = 0; i < this.filtered.length; i++ ) {
          this.sum += this.filtered[i].data.price
        }
      },
      load() {
    this.ids.length = 0
    this.filtered.length = 0
    if(localStorage.orders){
      const targetorders = JSON.parse(localStorage.orders)
    for (let i = 0; i < this.page.results.length; i++) {
      for (let j = 0; j < targetorders.length; j++) {
        if(this.page.results[i].id == targetorders[j]){
        this.filtered.push(this.page.results[i])
        this.ids.push(this.page.results[i].id)
      }
        
      }
    }
    if(targetorders.length > 0){
    document.getElementById('asdf').style.display = 'block'
    document.getElementById('sdf').style.display = 'none'
    }
  }
  this.total()
      }
  },
  mounted(){
    this.load()
    }
  }
  </script>
  