const express = require('express');
const router = express.Router();
const categoriesAPIController = require('../../controllers/api/categoriesAPIController');

router.get('/', categoriesAPIController.list);

module.exports = router;