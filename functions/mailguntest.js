const FormData = require("form-data"); // form-data v4.0.1
const Mailgun = require("mailgun.js"); // mailgun.js v11.1.0

sendSimpleMessage();

async function sendSimpleMessage() {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "API_KEY",
    // When you have an EU-domain, you must specify the endpoint:
    url: "https://api.eu.mailgun.net"
  });
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