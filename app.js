const express = require('express');
const app = express();
const rutasMain = require('./routes/mainRouter');
const rutasProductos = require('./routes/productsRouter');
const rutasUsuarios = require('./routes/usersRouter');
const rutasAutores = require('./routes/authorsRouter');
const rutasCategorias = require('./routes/categorysRouter');
const rutasCarrito = require('./routes/shopRouter');
const rutasAPIProductos = require('./routes/api/products');
const rutasAPIAutores = require('./routes/api/authors');
const rutasAPICategorias = require('./routes/api/categories');
const rutasAPIUsers = require('./routes/api/users');
const rememberMiddleware = require('./middleware/rememberUser');
const userNavBarMiddleware = require('./middleware/userNavBarMiddleware');
const methodOverride =  require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(methodOverride('_method')); 

app.use(express.static('./public'));

app.use(express.urlencoded({extended: false}));

app.use(session({secret: 'Bugga', resave: false, saveUninitialized: true}));

app.use(cookieParser());
app.use(rememberMiddleware);
app.use(userNavBarMiddleware);

app.set('view engine', 'ejs');

/*APIs*/
app.use('/api/products', rutasAPIProductos);
app.use('/api/authors', rutasAPIAutores);
app.use('/api/categories', rutasAPICategorias);
app.use('/api/users', rutasAPIUsers);

app.use('/', rutasMain);
app.use('/products', rutasProductos);
app.use('/authors', rutasAutores);
app.use('/categorys', rutasCategorias);
app.use('/user', rutasUsuarios);
app.use('/shop', rutasCarrito);

app.use((req,res,next)=>{
    res.status(404).render('error404');
  });



app.listen(process.env.PORT || 3010, function () { console.log('Servidor OK - bugga2 - puerto 3010')});




