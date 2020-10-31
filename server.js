const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');

const { validateCreateUser, loginUser } = require('./middlewares/users');
const { addOrder, updateOrder, deleteOrder } = require('./middlewares/orders');
const { addProducts, getProducts, updateProducts, deleteProducts } = require('./middlewares/products');
const { validateToken, validateUser } = require('./middlewares/security');

const app = express();
app.use(helmet());
app.use(express.json());

const router = express.Router();

app.use(router);

/* Routes */

//User
router.post('/createUser', validateCreateUser, (req, res) => {
    console.log('finalizo user');
});

router.post('/login', loginUser, async(req, res) => {
    console.log('finalizo login');
});

//Orders

router.post('/addOrder', validateToken, addOrder, async(req, res) => {
    console.log('finalizo agregar orden');
});

router.put('/updateOrder', validateToken, validateUser, updateOrder, (req, res) => {
    console.log('finalizo actualizar orden');
});

router.delete('/deleteOrder', validateToken, validateUser, deleteOrder, async(req, res) => {
    await console.log('finalizo borrar orden');
});

//Products

router.put('/updateProducts', validateToken, validateUser, updateProducts, (req, res) => {});
router.post('/addProducts', validateToken, validateUser, addProducts, (req, res) => {});
router.delete('/deleteProducts', validateToken, validateUser, deleteProducts, (req, res) => {});
router.get('/getProducts', validateToken, getProducts, (req, res) => {});


//Server

app.listen(3000, () => {
    console.log(`Servidor iniciado en http://localhost:3000`);
});