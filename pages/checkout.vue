<template>
    <div>
      {{ shipping.data.list }}
      <div class="md:px-48 px-4">
        <div v-for="(item, i) in filtered" :key="`slice-item-${i}`" class="flex gap-4 pt-4">
    <PrismicImage :field="item.data.image" class=" h-[100px] w-[100px] border object-cover"/><div>
    <div :style="{'color':item.data.color}" class="flex justify-start font-cooperbt text-xl"><span v-if="item.data.number == 0" class="text-sm pr-1 translate-y-1">⓿</span><span v-else class="text-2xl pr-1 -translate-y-0.5">{{ String.fromCharCode(	0x2775 + Number(item.data.number)) }}</span><prismic-rich-text :field="item.data.title" class="" /></div>
    <div class="pt-5 font-garamond flex justify-evenly">€{{item.data.price}},–  <span><label>Quantity:</label> <input
            type="number"
            class="quantity"
            value="1"
            min="1"
            max="10"
          /></span>
        <span><form @submit="remove($event)" class="">
          <input type="hidden" name="id" :value="item.id" />
          <button class="font-metrik text-xs border border-black rounded-full py-1 px-2 hover:bg-sky-200" type="submit">Remove</button>
        </form></span></div></div>
  </div>
        <form @submit="handleSubmit($event)" action="/.netlify/functions/create-checkout" method="post" class="pt-8">
          <label for="shipping" class="font-metrik text-sm pl-1">Ship to:</label>
          <select id="shipping" name="shipping" class="text-sm">
            <option v-for="(item, i) in shipping.data.list" :key="`slice-item-${i}`" :value="item.code">{{ item.code }} €{{ item.cost }}</option>
          </select>
          <input type="hidden" name="sku" value="DEMO002" />
          <button id="asdf" class="font-metrik text-xs border border-black rounded-full py-1 px-2 hover:bg-sky-200 hidden" type="submit">Proceed to Checkout</button>
        </form>
        <div id="sdf" class="font-metrik text-xs">There are no items in the cart. Hit the <NuxtLink to="/" class="border w-min border-black rounded-full py-1 px-2 active:bg-sky-700 hover:bg-sky-200">ORDER</NuxtLink> button in product pages to add items to the cart.</div>
      </div>
    </div>
  </template>
  
  <script>
  import { components } from '~/slices'
  
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
        ids: []
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
          event.target.parentElement.parentElement.parentElement.parentElement.remove()
          localStorage.orders = JSON.stringify(itemarray)
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
  },
  mounted(){
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
    }
  }
  </script>
  