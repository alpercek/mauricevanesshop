<template>
    <div>
      <div class="px-48">
        <div v-for="(item, i) in filtered" :key="`slice-item-${i}`" class="flex gap-4 pt-4">
    <PrismicImage :field="item.data.image" class=" h-[100px] w-[100px] border object-cover"/><div>
    <div :style="{'color':item.data.color}" class="flex justify-start font-cooperbt text-xl">{{ String.fromCharCode(	0x2776 + i) }}<prismic-rich-text :field="item.data.title" class="" /></div>
    <div class="pt-5 font-garamond">€{{item.data.price}},–</div></div>
  </div>
        <form @submit="handleSubmit($event)" action="/.netlify/functions/create-checkout" method="post" class="pt-8">
          <input type="hidden" name="sku" value="DEMO002" />
          <button class="font-metrik text-xs border border-black rounded-full py-1 px-2 hover:bg-sky-200" type="submit">Proceed to Checkout</button>
        </form>
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
      }
      
    },
    head () {
      return {
        title: 'Checkout'
      }
    },
    methods: {
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

        const form = new FormData(event.target);
        const data = {
          sku: form.get('sku'),
          quantity: 1
        };

        const response = await fetch('/.netlify/functions/create-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: localStorage.orders,
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
      }
        
      }
    }
  }
    }
  }
  </script>
  