const Transaction = require('../models/transaction.model');

// @desc    Get user transactions
// @route   GET /api/transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, count: transactions.length, data: transactions });
  } catch (error) {
    next(error);
  }
};

// @desc    Add transaction
// @route   POST /api/transactions
exports.addTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, category, date } = req.body;
    
    const transaction = await Transaction.create({
      user: req.user.id,
      title,
      amount,
      type,
      category,
      date
    });

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      throw new Error('Transaction not found');
    }

    // Make sure the logged-in user matches the transaction user
    if (transaction.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await transaction.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};