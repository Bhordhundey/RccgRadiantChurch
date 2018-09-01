const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

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

app.get('/sermons', (req, res) => {
  res.render("sermons")
});

app.get('/news', (req, res) => {
  res.render("news")
});

app.get('/events', (req, res) => {
  res.render("events")
});

app.get('/contact', (req, res) => {
  res.render("contact")
});

app.get('/gallery', (req, res) => {
  res.render("gallery")
})




const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})