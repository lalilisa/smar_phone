var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'maivantri309@gmail.com',
    pass: 'hunterboy95'
  }
});

var mailOptions = {
  from: 'maivantri309@gmail.com',
  to: 'maivantri308@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});