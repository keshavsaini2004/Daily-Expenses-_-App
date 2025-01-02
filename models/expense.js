const mongoose = require('mongoose');

const expenseSchema  =  new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
    required: true
   },
    amount: {
      type : Number,
      required: true
    },
    category: {
      type : String,
      enum: ['Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others'], 
      required: true
    },
    date: {
      type : Date,
      required: true,
      default: Date.now
    },
    description: {
       type: String 
    },

  },
  {
    timestamps: { 
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    versionKey : false
})

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;