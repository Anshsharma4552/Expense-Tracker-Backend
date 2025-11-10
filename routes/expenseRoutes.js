const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Placeholder routes for expenses
router.get('/', protect, (req, res) => {
    res.json({ message: 'Get expenses endpoint' });
});

router.post('/', protect, (req, res) => {
    res.json({ message: 'Create expense endpoint' });
});

module.exports = router;