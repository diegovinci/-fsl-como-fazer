const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const categories = require('./routes/categories');
const articles = require('./routes/articles');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use('/categories', categories);
app.use('/articles', articles);

app.get('/', async (req, res) => {
  res.render('index');
});

app.listen(3000, (err) => {
  if (err) {
    console.error('Error');
  } else {
    console.info(`Como-Fazer Server is running on port ${port}.`);
  }
});
