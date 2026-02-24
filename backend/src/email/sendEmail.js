import { Resend } from "resend";
import emailTemplate from './emailTemplate.js'
import "dotenv/config"


const sendWelcomeEmail = async(clientData, res) => {

  //Extracting the variable using destructuring
  const {fullName, email} = clientData
  console.log({clientData})
  const {RESEND_API_KEY, EMAIL_DEV, APP_NAME, URL} = process.env

  //CHech to see if KEYS exist before continueing
  if(!RESEND_API_KEY || !EMAIL_DEV || !APP_NAME || !URL) throw new Error("Dotenv are Undefined")
  //The Resend API key is required to authenticate requests
  const resend = new Resend(RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: `${APP_NAME} <${EMAIL_DEV}>`,
    to:[email],
    subject: "Welcome to Chatify",
    html: emailTemplate(fullName, email, URL),
  });

  if (error) {
    console.error('failed to send email', error.message)
    // return res.status(400).json({ error });
  }else{
      console.log("Welcome Email sent suuccessfully", data)
  }

}

export default sendWelcomeEmail 