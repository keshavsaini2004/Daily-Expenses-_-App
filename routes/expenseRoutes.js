const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
const User = require('../models/user');
const { jwtAuthMiddleware } = require('./../jwt');

// Apply jwtAuthMiddleware to all routes that require authentication
router.use(jwtAuthMiddleware);

router.post('/create', async (req, res) => {
  try{
    const data = req.body;
    const insertJson ={
      userId: data.userId,
      amount: data.amount,
      category: data.category,
      date: data.date,
      description: data.description
    }
    const newExpedatense = new Expense(insertJson);
    const response = await newExpedatense.save();
    res.status(200).json({
      success:true,
      status: 200,
      message: "Data saved successfully",
      data: response
    });
  }catch(err){
    console.error(err);
    res.status(500).json({success:false, message: "Internal Server Error" });
  }
})       
router.get('/user/:userID', async (req, res) => {
  const { userID } = req.params;

  try {
    // Find expenses where the user field matches the provided userID
    const expenses = await Expense.find({ userId: userID });

    if (expenses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No expenses found for the given userID",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get('/expenses/date', async (req, res) => {
  const { date } = req.query; // Extract the date from query parameters

  try {
    // Ensure date is provided
    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required to filter expenses",
      });
    }

    // Convert the string to a Date object
    const parsedDate = new Date(date);

    // Validate date parsing
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD format.",
      });
    }

    // Fetch expenses for the specific date
    const expenses = await Expense.find({
      date: {
        $gte: new Date(parsedDate.setHours(0, 0, 0, 0)), // Start of the day
        $lte: new Date(parsedDate.setHours(23, 59, 59, 999)), // End of the day
      },
    });

    // Check if any expenses exist
    if (expenses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No expenses found for the given date",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});




module.exports = router;