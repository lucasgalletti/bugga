var express = require('express');
var router = express.Router();

const loggedMiddleware = require('../middleware/loggedMiddleware');

const validator = require('../middleware/validatorProdShop');


// ************ Controller Require ************
const shopController = require('../controllers/shopController');

router.post('/adicionarAlCarrito', loggedMiddleware, shopController.addCart);
router.get('/', loggedMiddleware, shopController.cart);
router.post('/borrarElementoCarrito', loggedMiddleware, shopController.deleteCart);
router.delete('/deleteAll', shopController.deleteAllCart)
// router.post('/compra', loggedMiddleware, shopController.shop);
// router.get('/historialCompra', loggedMiddleware, shopController.history);
// router.get('/detalleCompra/:id', loggedMiddleware, shopController.buyDetail);

module.exports = router;