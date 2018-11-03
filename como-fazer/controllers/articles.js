const service = require('../services')

const createForm = async (req, res) => {
  const categories = await service.list('categories');
  res.render('articles/create', { categories });
}

const create = async (req, res) => {
  await service.create(`articles/${req.body.category}`, {
    title: req.body.title,
    content: req.body.content
  });
  res.redirect(`/articles/category/${req.body.category}`);
}

const list = async (req, res) => {
  const category = req.params.category;
  const articles = await service.list(`articles/${category}`);
  res.render('articles/index', { articles, category });
}

const remove = async (req, res) => {
  await service.remove(`articles/${req.params.category}`, req.params.id);
  res.redirect(`/articles/category/${req.params.category}`);
}

const updateForm = async (req, res) => {
  const article = await service.get(`articles/${req.params.category}`, req.params.id);
  res.render('articles/update', {
    article,
    category: req.params.category
  });
}

const update = async (req, res) => {
  await service.update(`articles/${req.params.category}/`, req.params.id, {
    title: req.body.title,
    content: req.body.content
  });
  res.redirect(`/articles/category/${req.params.category}`);
}

module.exports = {
  createForm,
  updateForm,
  create,
  list,
  remove,
  update
}