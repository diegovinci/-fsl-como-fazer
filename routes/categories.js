const express = require('express');
const router = express.Router();

const controller = require('../controllers/categories');

router.get('/create', controller.createForm);
router.get('/update/:id', controller.updateForm);

router.get('/', controller.list);
router.get('/remove/:id', controller.remove);
router.post('/create', controller.create);
router.post('/update/:id', controller.update);

module.exports = router;