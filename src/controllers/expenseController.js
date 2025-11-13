const Expense = require('../models/Expense');

// Add Expense
exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    
    if (!title || !amount || !category) {
        return res.status(400).json({
            success: false,
            message: 'Title, amount, and category are required'
        });
    }
    
    if (amount <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Amount must be greater than 0'
        });
    }
    
    try {
        const expense = await Expense.create({
            title,
            amount: parseFloat(amount),
            category,
            description,
            date: date || new Date(),
            user: req.user.id
        });
        
        res.status(201).json({
            success: true,
            message: 'Expense added successfully',
            expense
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding expense',
            error: error.message
        });
    }
};

// Update Expense
exports.updateExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    
    if (!title || !amount || !category) {
        return res.status(400).json({
            success: false,
            message: 'Title, amount, and category are required'
        });
    }
    
    if (amount <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Amount must be greater than 0'
        });
    }
    
    try {
        const expense = await Expense.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            {
                title,
                amount: parseFloat(amount),
                category,
                description,
                date: date || new Date()
            },
            { new: true }
        );
        
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Expense updated successfully',
            expense
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating expense',
            error: error.message
        });
    }
};

// Get All Expenses
exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).json({
            success: true,
            expenses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching expenses',
            error: error.message
        });
    }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Expense deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting expense',
            error: error.message
        });
    }
};