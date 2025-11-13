const Income = require('../models/Income');

// Add Income
exports.addIncome = async (req, res) => {
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
        const income = await Income.create({
            title,
            amount: parseFloat(amount),
            category,
            description,
            date: date || new Date(),
            user: req.user.id
        });
        
        res.status(201).json({
            success: true,
            message: 'Income added successfully',
            income
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding income',
            error: error.message
        });
    }
};

// Update Income
exports.updateIncome = async (req, res) => {
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
        const income = await Income.findOneAndUpdate(
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
        
        if (!income) {
            return res.status(404).json({
                success: false,
                message: 'Income not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Income updated successfully',
            income
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating income',
            error: error.message
        });
    }
};

// Get All Incomes
exports.getAllIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user.id });
        res.status(200).json({
            success: true,
            incomes
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching incomes',
            error: error.message
        });
    }
};

// Delete Income
exports.deleteIncome = async (req, res) => {
    try {
        const income = await Income.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        
        if (!income) {
            return res.status(404).json({
                message: 'Income not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Income deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting income',
            error: error.message
        });
    }
};

// Download Income Excel
exports.downloadIncomeExcel = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Excel download feature coming soon'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error downloading excel',
            error: error.message
        });
    }
};