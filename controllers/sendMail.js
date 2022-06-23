const {google}=require('googleapis')
const nodemailer=require('nodemailer')
const adminEmail = process.env.EMAILADMIN
require('dotenv').config()


const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET
const REDIRECT_URI=process.env.REDIRECT_URI
const REFRESH_TOKEN=process.env.REFRESH_TOKEN

const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)

oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

const sendMail= async (to, subject, htmlContent)=>{
  try {
      const accessToken=await oAuth2Client.getAccessToken()
      const transport=nodemailer.createTransport({
      service:"gmail",
      auth:{
        type:"OAuth2",
        user:"maivantri309@gmail.com",
        clientId:CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        refreshToken:REFRESH_TOKEN,
        accessToken:accessToken
      }
      })
      const options = {
        from: adminEmail, 
        to: to, 
        subject: subject, 
        html:htmlContent
      }

       transport.sendMail(options)
  } catch (error) {
    console.log(error)
  }

}


module.exports = {
     sendMail
}
