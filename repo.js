
const {google}=require('googleapis')
const nodemailer=require('nodemailer')
require('dotenv').config()


const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET
const REDIRECT_URI=process.env.REDIRECT_URI
const REFRESH_TOKEN=process.env.REFRESH_TOKEN

const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)

oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

const sendMail= async ()=>{
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
        from: "maivantri309@gmail.com", 
        to: "maivantri309@gmail.com", 
        subject: "subject", 
        html:"<h1 style:'color:red'>TrisMai</h1>"
      }

       transport.sendMail(options)
  } catch (error) {
    console.log(error)
  }

}

sendMail()