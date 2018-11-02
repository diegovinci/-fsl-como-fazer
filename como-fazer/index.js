const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const api = require('./api');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());

app.get('/', async (req, res) => {
  const content = await axios.get('https://fsl-como-fazer.firebaseio.com/teste.json');
  res.render('index', { content: content.data });
});

app.get('/categorias', async (req, res) => {
  const categorias = await api.list('categorias');
  res.render('categorias/index', { categorias })
});

app.get('/categorias/excluir/:id', async (req, res) => {
  await api.remove('categorias', req.params.id);
  res.redirect('/categorias');
});

app.get('/categorias/nova', (req, res) => {
  res.render('categorias/nova');
});

app.post('/categorias/nova', async (req, res) => {
  await api.create('categorias', {
    categoria: req.body.categoria
  });
  res.redirect('/categorias');
});

app.get('/categorias/editar/:id', async (req, res) => {
  const categoria = await api.get('categorias', req.params.id);
  res.render('categorias/editar', {
    categoria
  });
});

app.post('/categorias/editar/:id', async (req, res) => {
  await api.update('categorias', req.params.id, {
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
