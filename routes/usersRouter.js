const express = require('express');
const router = express.Router();
const path = require('path');
const { check } = require('express-validator');
const usersController = require('../controllers/usersController');
const uploadProfImg = require('../middleware/upload_profileImg');
const guestMiddleware = require('../middleware/guestMiddleware');
const loggedMiddleware = require('../middleware/loggedMiddleware');


//Validaciones
const validateRegister = [
    check('name').trim().notEmpty().withMessage('* Ingresá tu nombre').bail()
    .isLength({min: 2}).withMessage('* El usuario debe tener al menos 2 caracteres').bail(),
    check('mail').trim().notEmpty().withMessage('* Ingresá tu mail').bail()
    .isEmail().isLength({min: 2}).withMessage('* Ingresá un e-mail válido').bail().normalizeEmail(),
    check('pass').notEmpty().withMessage('* Ingresá una contraseña').bail()
    .isLength({min: 8}).withMessage('* Su contraseña debe tener al menos 8 caracteres').bail(),
    check('registerImg').custom((value,{req})=>{
        let file=req.file
        if (file) {
            let fileExtension=path.extname(file.originalname)
            let acceptedExtensions=[".jpg",".jpeg",".png",".gif"]
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error ("Extensiones válidas JPG, JPEG, PNG o GIF");
            }   
        }
        
        return true
    })  
    
];
const validateLogin = [
    check('mail').notEmpty().withMessage('* Ingresá tu mail').bail()
    .isEmail().withMessage('* Ingresá un e-mail válido'),
    check('pass').notEmpty().withMessage('* Ingresá una contraseña')
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
router.put('/:id', uploadProfImg.single('registerImg'), usersController.update);

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