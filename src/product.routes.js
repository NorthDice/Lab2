import express from 'express';
import products from './products.js';
import { blockSpecialBrand } from './middleware.js';

const router = express.Router();

router.get('/products', (request, response) => {
   return response.json(products);
});

router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params;
   const filteredProducts = products.filter(product => product.brand === brand);
   response.json(filteredProducts);
});

router.get('/products/id/:id', (request, response) => {
   const { id } = request.params;
   const product = products.find(p => p.id === parseInt(id));

   if (product) {
       response.json(product);
   } else {
       response.status(404).json({ message: 'Product not found' });
   }
});

router.get('/productswitherror', (request, response) => {
   let err = new Error("processing error ")
   err.statusCode = 400
   throw err
});

export default router;
