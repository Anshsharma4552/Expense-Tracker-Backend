const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    addExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense
} = require('../controllers/expenseController');

const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpenses);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router;