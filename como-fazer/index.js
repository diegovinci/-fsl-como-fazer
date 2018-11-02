const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());

app.get('/', async (req, res) => {
  const content = await axios.get('https://fsl-como-fazer.firebaseio.com/teste.json');
  res.render('index', { content: content.data });
});

app.get('/categorias', async (req, res) => {
  const content = await axios.get('https://fsl-como-fazer.firebaseio.com/categorias.json');
  if (content.data) {
    const categorias = Object.keys(content.data)
      .map((key) => {
        return {
          id: key, ...content.data[key]
        }
      })
    res.render('categorias/index', { categorias });
  } else {
    res.render('categorias/index', { categorias: [] });
  }
});

app.get('/categorias/nova', (req, res) => {
  res.render('categorias/nova');
});

app.get('/categorias/excluir/:id', async (req, res) => {
  await axios.delete(`https://fsl-como-fazer.firebaseio.com/categorias/${req.params.id}.json`);
  res.redirect('/categorias');
});

app.post('/categorias/nova', async (req, res) => {
  await axios.post('https://fsl-como-fazer.firebaseio.com/categorias.json', {
    categoria: req.body.categoria
  });
  res.redirect('/categorias');
});

app.listen(3000, (err) => {
  if (err) {
    console.error('Error');
  } else {
    console.info(`Como-Fazer Server is running on port ${port}.`);
  }
});
