import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import projectRoutes   from './routes/projectRoutes';
import taskRoutes      from './routes/taskRoutes';
import searchRoutes from './routes/searchRoutes'
import userRoutes from './routes/userRoutes'
import teamRoutes from './routes/teamRoutes'
import commentRoutes from './routes/commentRoutes'
import cookieParser from "cookie-parser";

// ROUTE IMPORTS

// CONFIGURATIONS

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const allowedOrigins = [
  'http://localhost:3000',        // Localhost for development
  'http://192.168.18.47:3000'    // Your local IP for accessing from other computers
];

// Allow only the specified origins
app.use(cors({
  origin: (origin, callback) => {
    if (origin && allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow origin
    } else {
      callback(new Error('Not allowed by CORS')); // Block origin
    }
  },
  credentials: true, // If you're using cookies or session
}));
app.use(cookieParser());
// ROUTES
app.get('/', (req, res) => {
  res.send('This is home route');
});
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/search', searchRoutes)
app.use('/users', userRoutes)
app.use('/teams', teamRoutes)
app.use('/comments', commentRoutes)


// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;

