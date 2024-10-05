const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.route('/')
    .get(itemController.getAllItems)
    .post(itemController.createItem);

router.route('/:id')
    .put(itemController.updateItem)
    .delete(itemController.deleteItem);

module.exports = router;