const express = require('express');
const path = require('path');
const { protect } = require(path.join(__dirname, '../middleware/authMiddleware'));
const {
    addExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense
} = require(path.join(__dirname, '../controllers/expenseController'));

const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpenses);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router;