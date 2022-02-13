const express = require('express');
const router = express.Router();
const uploalBookImg = require('../middleware/upload_booksImg');
const productController = require('../controllers/productController');

const { body } = require('express-validator');

const validateProductForms = [
    body('title').trim().notEmpty().withMessage('* Agregá un nombre al producto').bail()
    .isLength({min: 5}).withMessage('* Agregá un nombre válido').bail(),
    body('Sinopsis').trim().notEmpty().withMessage('* Agregá una sinopsis').bail()
    .isLength({min: 20}).withMessage('* Debe tener al menos 20 caracteres').bail(),
    body('file').notEmpty().withMessage('* Agregá una imágen').bail()

]

router.get('/admin', productController.admin);
router.get('/search', productController.search);

router.get('/', productController.index);
router.get('/carrito', productController.carrito);

router.get('/create', productController.create);
router.post('/', uploalBookImg.single('bookImg'),  productController.store);

router.get('/:id/', productController.detail);

router.get('/edit/:id', productController.edit);
router.put('/:id', uploalBookImg.single('bookImg'), productController.update);

router.get('/delete/:id', productController.delete);
router.delete('/delete/:id', productController.destroy);





module.exports = router;