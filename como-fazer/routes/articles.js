const express = require('express');
const router = express.Router();

const controller = require('../controllers/articles');

router.get('/create', controller.createForm);
router.get('/update/:category/:id', controller.updateForm);

router.get('/category/:category', controller.list);
router.get('/remove/:category/:id', controller.remove);
router.post('/create', controller.create);
router.post('/update/:category/:id', controller.update);

module.exports = router;