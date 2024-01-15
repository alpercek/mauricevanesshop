
import * as prismic from '@prismicio/client'
import fetch from 'node-fetch'
import Stripe from 'stripe'

const routes = [
  {
    type: 'page',
    path: '/:uid',
  },
]

const repoName = 'scannedfootballphotos'
const client = prismic.createClient(repoName, { routes, fetch })
/*

{
      price_data: {
        currency: 'eur',
        unit_amount: product.amount,
        product_data: {
          name: product.name,
          description: product.description,
          images: [product.image],
        },
      },
      quantity: validatedQuantity,
    },

 * This function creates a Stripe Checkout session and returns the session ID
 * for use with Stripe.js (specifically the redirectToCheckout method).
 *
 * @see https://stripe.com/docs/payments/checkout/one-time
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */

exports.handler = async (event) => {
  //const product = inventory.find((p) => p.sku === sku);
  // ensure that the quantity is within the allowed range
  //const validatedQuantity = quantity > 0 && quantity < 11 ? quantity : 1;
  const { orders, quantity, ship } = JSON.parse(event.body);
  const line_itemss = []
  const meta_itemss = []
  const pages = await client.getByIDs(orders)
  const shippingstuff = await client.getSingle('shipping')
  console.log(shippingstuff)
  const shippingcost = shippingstuff.data.list.filter((word) => word.code == ship)[0].cost
  const converted = shippingcost*100
  const fixed = Math.round(converted * 1e2) / 1e2
  console.log(fixed)
  for (let i = 0; i < pages.results.length; i++) {
    if(pages.results[i].data.description[0]){
    line_itemss.push(
      {
      price_data: {
        currency: 'eur',
        unit_amount: pages.results[i].data.price*100,
        product_data: {
          name: pages.results[i].data.title[0].text,
          description: pages.results[i].data.description[0].text,
          
          images: [pages.results[i].data.image.url],
        },
      },
      quantity: quantity[i],
    }
      )
    }
    else {
      line_itemss.push(
        {
        price_data: {
          currency: 'eur',
          unit_amount: pages.results[i].data.price*100,
          product_data: {
            name: pages.results[i].data.title[0].text,
            description: 'no description',
            
            images: [pages.results[i].data.image.url],
          },
        },
        quantity: quantity[i],
      }
        )
    }
      meta_itemss.push(
        {
          name: pages.results[i].data.title[0].text,
          quantity: quantity[i],
        }
      )
  }
//shipping
  line_itemss.push(
    {
    price_data: {
      currency: 'eur',
      unit_amount: fixed,
      product_data: {
        name: 'Shipping Cost',
      },
    },
    quantity: 1,
  }
    )

  const test = JSON.stringify(line_itemss)
console.log(test)
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'ideal'],
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: [ship],
    },
    /*
     * This env var is set by Netlify and inserts the live site URL. If you want
     * to use a different URL, you can hard-code it here or check out the
     * other environment variables Netlify exposes:
     * https://docs.netlify.com/configure-builds/environment-variables/
     */
    success_url: `${process.env.URL}/success.html`,
    cancel_url: process.env.URL,
    line_items: 
    JSON.parse(test),
    // We are using the metadata to track which items were purchased.
    // We can access this meatadata in our webhook handler to then handle
    // the fulfillment process.
    // In a real application you would track this in an order object in your database.
    metadata: {
      items: JSON.stringify(meta_itemss),
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};
