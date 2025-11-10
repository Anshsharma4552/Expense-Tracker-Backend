const Inventory = require('../models/Inventory');

// Add Inventory Item
exports.addItem = async (req, res) => {
    const { name, category, quantity, price, description } = req.body;
    
    if (!name || !category || quantity === undefined || price === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Name, category, quantity, and price are required'
        });
    }
    
    if (quantity < 0 || price < 0) {
        return res.status(400).json({
            success: false,
            message: 'Quantity and price must be non-negative'
        });
    }
    
    try {
        const item = await Inventory.create({
            name,
            category,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            description,
            user: req.user.id
        });
        
        res.status(201).json({
            success: true,
            message: 'Item added successfully',
            item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding item',
            error: error.message
        });
    }
};

// Get All Items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Inventory.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            items
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching items',
            error: error.message
        });
    }
};

// Delete Item
exports.deleteItem = async (req, res) => {
    try {
        const item = await Inventory.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Item deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting item',
            error: error.message
        });
    }
};