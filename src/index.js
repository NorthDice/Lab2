import express from 'express';
import productRouter from './product/product.router.js';
import userRoutes from './user/user.router.js';
import { logRequest } from './middleware.js';
import { errorResponder } from './error.middleware.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logRequest);
app.use(productRouter);
app.use(userRoutes);
app.use(errorResponder);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
