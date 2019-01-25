// This is the entry file for the server, configurations
// such as defining routes for endpoints and mapping them
// to respective controller function to handle request are done here.

// express : this is a module used in creating an express server
// body-parser : this is a module used parsing request body and attaching them to req.body
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import AuthCtrl from './controllers/auth';
import ProductCtrl from './controllers/product';
import CartCtrl from './controllers/cart';
import AuthMid from './middlewares/auth';

// create an express server
const app = express();

// declare port for server
const port = process.env.PORT || 8000;

// tell express to parse request body
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));
  app.use('/dist', express.static('dist'));
}

app.use(bodyParser());

// declare routes for different endpoint
// expected to be consumed by API
app.get('/api', (req, res) => {
  res.json(200, {
    message: 'Welcome to WahKart API'
  });
});

app.post('/api/register', AuthCtrl.register);
app.post('/api/login', AuthCtrl.login);
app.post('/api/auth', AuthCtrl.authenticate);
app.get('/api/products', ProductCtrl.getAll);
app.get('/api/cart-items', AuthMid.checkToken, CartCtrl.getCartItems)
app.post('/api/cart-items', AuthMid.checkToken, CartCtrl.addCartItem)
app.delete('/api/cart-items', AuthMid.checkToken, CartCtrl.deleteCartItem)
app.post('/api/products', AuthMid.checkToken, ProductCtrl.addProduct);
app.get('/api/products/:productId', ProductCtrl.getProduct);
app.put('/api/products/:productId', AuthMid.checkToken, ProductCtrl.editProduct);
app.delete('/api/products/:productId', AuthMid.checkToken, ProductCtrl.deleteProduct);

app.all('*', (req, res) => {
  if(process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  } else {
    res.send('You are running the server in development mode');
  }
});

// Start the express server
app.listen(port, (error) => {
  if(error) {
    console.log("\nUnable to start server\n");
  } else {
    console.log(`\nServer started on port ${port}\n`);
  }
});
