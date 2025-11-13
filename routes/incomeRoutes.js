const express= require('express');
const path = require('path');
const {
    addIncome,
    getAllIncomes,
    updateIncome,
    deleteIncome,
    downloadIncomeExcel,
} = require(path.join(__dirname, '../controllers/incomeController'));
const { protect } = require(path.join(__dirname, '../middleware/authMiddleware'));

const router=express.Router();
router.post('/add',protect,addIncome);
router.get('/get',protect,getAllIncomes);
router.put('/:id',protect,updateIncome);
router.put('/downloadexcel',protect,downloadIncomeExcel);
router.delete('/:id',protect,deleteIncome);

module.exports=router;