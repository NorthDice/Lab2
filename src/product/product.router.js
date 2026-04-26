import express from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { products } from '../db/schema.js';

const router = express.Router();

router.post('/products', async (request, response) => {
  const { name, brand, userId } = request.body;
  const [product] = await db.insert(products).values({ name, brand, userId }).returning();
  response.status(201).json(product);
});

router.get('/products', async (request, response) => {
  const allProducts = await db.select().from(products);
  response.json(allProducts);
});

router.get('/users/:id/products', async (request, response) => {
  const { id } = request.params;
  const userProducts = await db.select().from(products).where(eq(products.userId, parseInt(id)));
  response.json(userProducts);
});

export default router;
