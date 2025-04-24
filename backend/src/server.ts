import process from 'node:process';
import consola from 'consola';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { mw as requestIp } from 'request-ip';
// import routes from './routes';
import { logger } from './utils/logger';
import './utils/env';
import { handleAddUser, handleDeleteUser, handleGetUser, handleUpdateUser, handleUserLogin } from './controllers/user.controller';
import { authenticate } from './middlewares/auth';
import { handleAddCategory, handleDeleteCategory, handleGetCategories, handleGetCategoryById, handleUpdateCategory } from './controllers/category.controller';
import { handleAddRestaurant, handleDeleteRestaurant, handleGetRestaurant, handleGetRestaurantById, handleUpdateRestaurant } from './controllers/restaurant.controller';
import { handleAddFood, handleDeleteFood, handleGetAllFoods, handleGetFoodById, handleGetFoodBySearch, handleGetFoodsByCategory, handleUpdateFood } from './controllers/food.controller';
import { handleAddMeja, handleDeleteMeja, handleGetMeja, handleGetMejaById, handleUpdateMeja } from './controllers/meja.controller';
import { handleAddOrder, handleDeleteOrder, handleGetOrderById, handleGetOrders } from './controllers/order.controller';
import { handleAddOrderItem, handleDeleteOrderItem, handleGetOrderItems } from './controllers/orderItems.controller';
import { handleAddAdditional, handleDeleteAdditional, handleGetAdditionalByFoodId, handleGetAdditionalById, handleGetAdditionals, handleUpdateAdditional } from './controllers/additional.controller';
import { errorHandler, handle404Error } from '@/utils/errors';

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());
app.use(requestIp());
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     handler: (req, res) => {
//       consola.warn(`DDoS Attempt from ${req.ip}`);
//       res.status(429).json({
//         error: 'Too many requests in a short time. Please try in a minute.',
//       });
//     },
//   }),
// );

app.use(logger);

app.get('/healthcheck', (_req, res) => {
  res.json({
    message: 'Server is running',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// users route
app.get('/api/user/', authenticate(), handleGetUser);
app.post('/api/user/create', handleAddUser);
app.post('/api/user/login', handleUserLogin);
app.delete('/api/user/remove', authenticate(), handleDeleteUser);
app.put('/api/user/update', authenticate(), handleUpdateUser);

// food categories route
app.get('/api/categories', handleGetCategories);
app.get('/api/categories/:id', handleGetCategoryById);
app.post('/api/categories', authenticate(), handleAddCategory);
app.put('/api/categories/:id', authenticate(), handleUpdateCategory);
app.delete('/api/categories/:id', authenticate(), handleDeleteCategory);

// foods route
app.get('/api/foods', handleGetAllFoods);
app.get('/api/foods/search', handleGetFoodBySearch);
app.get('/api/foods/category/:categoryId', handleGetFoodsByCategory);
app.get('/api/foods/:id', handleGetFoodById);
app.post('/api/foods', authenticate(), handleAddFood);
app.put('/api/food/:id', authenticate(), handleUpdateFood);
app.delete('/api/food/:id', authenticate(), handleDeleteFood);

// restaurant route
app.get('/api/restaurant', handleGetRestaurant);
app.get('/api/restaurant/:id', handleGetRestaurantById);
app.post('/api/restaurant', authenticate(), handleAddRestaurant);
app.put('/api/restaurant/:id', authenticate(), handleUpdateRestaurant);
app.delete('/api/restaurant/:id', authenticate(), handleDeleteRestaurant);

// meja route
app.get('/api/meja', handleGetMeja);
app.get('/api/meja/:id', handleGetMejaById);
app.post('/api/meja', authenticate(), handleAddMeja);
app.put('/api/meja/:id', authenticate(), handleUpdateMeja);
app.delete('/api/meja/:id', authenticate(), handleDeleteMeja);

// orders route
app.get('/api/admin/orders', authenticate(), handleGetOrders);
app.get('/api/admin/orders/:id', authenticate(), handleGetOrderById);
app.post('/api/orders', handleAddOrder);
app.delete('/api/admin/orders/:id', authenticate(), handleDeleteOrder);

// orders items route
app.get('/api/admin/orders/:id/items', authenticate(), handleGetOrderItems);
app.post('/api/admin/orders/:id/items', authenticate(), handleAddOrderItem);
app.delete('/api/admin/orders/:id/items/:itemId', authenticate(), handleDeleteOrderItem);

// additionals route
app.get('/api/additionals', handleGetAdditionals);
app.get('/api/additionals/:id', handleGetAdditionalById);
app.get('/api/foods/:foodId/additionals', handleGetAdditionalByFoodId);
app.post('/api/admin/additionals', authenticate(), handleAddAdditional);
app.put('/api/admin/additionals/:id', authenticate(), handleUpdateAdditional);
app.delete('/api/admin/additionals/:id', authenticate(), handleDeleteAdditional);

// app.use('/api', routes);
app.all('*', handle404Error);
app.use(errorHandler);

app.listen(PORT, () => {
  consola.info(`Server running at http://localhost:${PORT}`);
});
