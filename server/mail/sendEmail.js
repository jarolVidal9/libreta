// common.js
const { Resend } = require('resend');
const resend = new Resend('re_CBuYfLm7_JLAsTb9pS89Zr2Nn6Q22uGap');

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

