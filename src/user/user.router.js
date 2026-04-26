import express from 'express';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';

const router = express.Router();

router.post('/users', async (request, response) => {
  const { name, email } = request.body;
  const [user] = await db.insert(users).values({ name, email }).returning();
  response.status(201).json(user);
});

router.get('/users', async (request, response) => {
  const allUsers = await db.select().from(users);
  response.json(allUsers);
});

export default router;
