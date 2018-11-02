const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const categories = require('./routes/categories');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use('/categories', categories);

app.get('/', async (req, res) => {
  const content = await axios.get('https://fsl-como-fazer.firebaseio.com/teste.json');
  res.render('index', { content: content.data });
});

app.listen(3000, (err) => {
  if (err) {
    console.error('Error');
  } else {
    console.info(`Como-Fazer Server is running on port ${port}.`);
  }
});
