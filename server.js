require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require(path.join(__dirname, "./config/db"));
const authRoutes = require(path.join(__dirname, './routes/authRoutes'));
const incomeRoutes = require(path.join(__dirname, './routes/incomeRoutes'));
const expenseRoutes = require(path.join(__dirname, './routes/expenseRoutes'));
const inventoryRoutes = require(path.join(__dirname, './routes/inventoryRoutes'));
const app = express();

//Middleware to handle CORS
app.use(cors());
app.use(express.json());
connectDB();

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'Expense Tracker API is running!' });
});

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/income',incomeRoutes)
app.use('/api/v1/expense',expenseRoutes)
app.use('/api/v1/inventory',inventoryRoutes)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;