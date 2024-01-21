// common.js
const { Resend } = require('resend');
const resend = new Resend(process.env.APIKEYMAIL);

async function sendEmail(to, subject,html) {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: to,
    subject: subject,
    html: html,
  });
  console.error(error);
  Console.log(data)

}
module.exports = sendEmail;

