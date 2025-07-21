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

const brevo = require('@getbrevo/brevo');
let defaultClient = brevo.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;
let apiInstance = new brevo.TransactionalEmailsApi();
let sendSmtpEmail = new brevo.SendSmtpEmail();

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
      // Send and email to our fulfillment provider using brevo.

      sendSmtpEmail.subject = `New purchase from ${shippingDetails.name}`;
      sendSmtpEmail.htmlContent = JSON.stringify(purchase, null, 2);
      sendSmtpEmail.sender = { "name": "Robot", "email": process.env.FROM_EMAIL_ADDRESS };
      sendSmtpEmail.to = [
        { "email": process.env.FULFILLMENT_EMAIL_ADDRESS, "name": "Fullfillment" }
      ];

      apiInstance.sendTransacEmail(sendSmtpEmail);
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
