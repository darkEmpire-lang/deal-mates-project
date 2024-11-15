require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Initialize Express app
const app = express();



const allowedOrigins = [
  'https://deal-mates-admin.vercel.app', 
  'https://deal-mates-online-store.vercel.app'

];




app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps, CURL)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('The CORS policy for this site does not allow access from the specified origin.'));
      }
    }
  })
);



// Set up Helmet for Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "https://vercel.live"], // Allow scripts from vercel.live
      "default-src": ["'self'"],
    },
  })
);



app.use(express.json()); // JSON parser middleware

// Middleware
app.use(cors()); // Allow all origins. Adjust for production.
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Import Routes
const productRoutes = require('./routes/ProductRoutes');

// Use Routes
app.use('/products', productRoutes);


app.get('/', (req, res) => {
  res.send({ message: "Hello, your backend is working!" });
});

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('Mongo URI is missing! Please add it to your .env file.');
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the app if DB connection fails
  });

// Root Endpoint
app.get('/', (req, res) => {
  res.status(200).send('API is running successfully.');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Port Configuration
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
