import express from 'express';
import db from './config/Database.js';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();

try {
   await db.authenticate();
   console.log('Database connected');
} catch (error) {
   console.log(error);
}

// Sinkronisasi semua model
// (async () => {
//    try {
//       await db.sync({ force: true });
//       console.log('Database synced successfully!');
//    } catch (error) {
//       console.error('Error syncing database:', error);
//    }
// })();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.listen(5000, () => console.log('Server running on port 5000'));
