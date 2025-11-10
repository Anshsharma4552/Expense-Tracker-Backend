const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    addItem,
    getAllItems,
    deleteItem
} = require('../controllers/inventoryController');

const router = express.Router();

router.post('/add', protect, addItem);
router.get('/get', protect, getAllItems);
router.delete('/:id', protect, deleteItem);

module.exports = router;