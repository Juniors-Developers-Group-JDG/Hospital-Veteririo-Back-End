import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import ejs from 'ejs';
import swaggerUI from 'swagger-ui-express';
import { createRequire } from 'node:module';
// import swaggerDocument from './swagger.json';

import PostsRoutes from './src/routes/postsRoutes.js';
import SchedulingRoutes from './src/routes/schedulingRoutes.js';
import usersRoutes from './src/routes/usersRoutes.js';
import petsRoutes from './src/routes/petsRoutes.js';

const require = createRequire(import.meta.url);

const swaggerDocument = require('./swagger.json');

dotenv.config();
const app = express();
// MONGODB CONFIG
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
  console.log('conectado ao banco');
});

// BODY-PARSER CONFIG
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EJS CONFIG
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('public'));

// ROUTES
app.use('/', petsRoutes);
app.use('/schedules', SchedulingRoutes);
app.use('/posts', PostsRoutes);
app.use('/', usersRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.send('API Running!');
});
app.listen(process.env.PORT || 5000, () => {
  console.log('servidor ON');
});
