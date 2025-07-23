

exports.handler = async () => {
  try {
    const data = await mg.messages.create("sandbox7018145a16424b9db6c86d84f4b5b4d1.mailgun.org", {
      from: "Mailgun Sandbox <postmaster@sandbox7018145a16424b9db6c86d84f4b5b4d1.mailgun.org>",
      to: ["Alper Cekinmez <alpercekinmez7@gmail.com>"],
      subject: "Hello Alper Cekinmez",
      text: "Congratulations Alper Cekinmez, you just sent an email with Mailgun! You are truly awesome!",
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}

/*
 * This function implements a Stripe webhook handler to handle
 * fulfillment for our successful payments.
 *
 * @see https://stripe.com/docs/payments/checkout/fulfillment#webhooks
 */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});

const FormData = require("form-data"); // form-data v4.0.1
const Mailgun = require("mailgun.js"); // mailgun.js v11.1.0

const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    url: "https://api.eu.mailgun.net"
  });

exports.handler = async ({ body, headers }) => {
  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (stripeEvent.type === 'checkout.session.completed') {
      const eventObject = stripeEvent.data.object;
      const items = JSON.parse(eventObject.metadata.items);
      const shippingDetails = eventObject.shipping_details;

      // Here make an API call / send an email to your fulfillment provider.
      const purchase = { items, shippingDetails };
      console.log(`📦 Fulfill purchase:`, JSON.stringify(purchase, null, 2));
      // Send and email to our fulfillment provider using Sendgrid.

      await mg.messages.create("scannedfootballphotos.com", {
      from: process.env.FROM_EMAIL_ADDRESS,
      to: [process.env.FULFILLMENT_EMAIL_ADDRESS],
      subject: `New purchase from ${shippingDetails.name}`,
      text: JSON.stringify(purchase, null, 2),
    });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`);

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};
