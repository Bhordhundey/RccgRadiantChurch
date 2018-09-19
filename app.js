const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// Index Route
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render("about")
})

// app.get('/sermons', (req, res) => {
//   res.render("sermons")
// });

app.get('/news', (req, res) => {
  res.render("news")
});

app.get('/events', (req, res) => {
  res.render("events")
});

app.get('/contact', (req, res) => {
  res.render("contact")
});

app.post('/send', (req, res) => {
  const output =`
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Name: ${req.body.email}</li>
      <li>Name: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using default SMT transport
  let transporter = nodemailer.createTransport({
    host: 'mail.bhordhundey.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'test@bhordhundey.com', // generated ethereal user
      pass: '123abc' //generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  // sertup email data with unicode symbols
  let mailOptions = {
    from: '"Nodemailer Contact" <test@bhordhundey.com>', // sender address
    to: 'adetunjibodunde1@gmail.com', // list of receivers
    subject: 'Contact Request From Radiant  ', // subject line
    text: 'Hello world?', // plain text body
    html: output // html body 
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact', {msg:'Email has been sent'});
  })  
})

app.get('/gallery', (req, res) => {
  res.render("gallery")
})




const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})