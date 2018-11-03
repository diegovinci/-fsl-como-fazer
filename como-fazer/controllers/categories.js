const service = require('../services')

const createForm = (req, res) => {
  res.render('categories/create');
}

const create = async (req, res) => {
  await service.create('categories', {
    category: req.body.category
  });
  res.redirect('/categories');
}

const list = async (req, res) => {
  const categories = await service.list('categories');
  res.render('categories/index', { categories })
}

const remove = async (req, res) => {
  await service.remove('categories', req.params.id);
  await service.remove('articles', req.params.id);
  res.redirect('/categories');
}

const updateForm = async (req, res) => {
  const category = await service.get('categories', req.params.id);
  res.render('categories/update', {
    category
  });
}

const update = async (req, res) => {
  await service.update('categories', req.params.id, {
    category: req.body.category
  });
  res.redirect('/categories');
}

module.exports = {
  createForm,
  updateForm,
  create,
  list,
  remove,
  update
}