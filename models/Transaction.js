const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    creditId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'credit',
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: 'pending'
    },
    currency: {
        type: String,
        required: true
    },
    plan: {
        type: String,
    },
    transactionId: {
        type: String,
        required: true
    },
    type: {
        type: String,  // withdrawal or deposit
        required: true,
    },
});

module.exports = Credit = mongoose.model('transaction', TransactionSchema);
