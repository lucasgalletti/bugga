const express = require('express');
const router = express.Router();
const path = require('path');
const { body } = require('express-validator');
const usersController = require('../controllers/usersController');
const uploadProfImg = require('../middleware/upload_profileImg');
const guestMiddleware = require('../middleware/guestMiddleware');
const loggedMiddleware = require('../middleware/loggedMiddleware');


//Validaciones
const validateRegister = [
    body('name').trim().notEmpty().withMessage('* Ingresá tu nombre').bail()
    .isLength({min: 2}).withMessage('* Ingresá un nombre válido').bail(),
    body('mail').trim().notEmpty().withMessage('* Ingresá tu mail').bail()
    .isEmail().withMessage('* Ingresá un e-mail válido').bail().normalizeEmail(),
    body('pass').notEmpty().withMessage('* Ingresá una contraseña').bail().withMessage('La contraseña debe contener como mínimo 6 caracteres')
    .isLength({min: 8}).withMessage('* Su contraseña debe tener al menos 8 caracteres').bail()
];
const validateLogin = [
    body('mail').notEmpty().withMessage('* Ingresá tu mail').bail()
    .isEmail().withMessage('* Ingresá un e-mail válido'),
    body('pass').notEmpty().withMessage('* Ingresá una contraseña')
];


router.get('/register', guestMiddleware, usersController.register);
router.post('/register', uploadProfImg.single('registerImg'), validateRegister, usersController.storeRegister);

router.get('/create', usersController.create);
router.post('/create', uploadProfImg.single('registerImg'), validateRegister, usersController.store);

router.get('/admin', usersController.list);
router.get('/search', usersController.search);

router.get('/profile', loggedMiddleware, usersController.profile);
router.get('/logout', usersController.destroyCookie);

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validateLogin, usersController.processLogin);

router.get('/:id', usersController.detail);
router.get('/edit/:id', usersController.edit);
router.put('/:id', uploadProfImg.single('registerImg'), validateRegister, usersController.update);

router.get('/delete/:id', usersController.delete);
router.delete('/delete/:id', usersController.destroy);



router.get('/check', function(req,res){
    if (req.session.userLogin == undefined){
        res.send('No estas logueado');
    } else {
        res.send('Estas logueado con el mail: ' + req.session.userLogin.mail);
    }
});

module.exports = router;