const mongoose = require('mongoose');

const CreditSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    balance: {
        type: Number,
        default: 0,
    },
    plan: {
        type: String,
        default: 'Basic',
    },
    profit: {
        type: Number,
        default: 0,
    },
    investment: {
        type: Number,
        default: 0,
    },
    cryptos: {
        bitcoin: {
            type: Number,
            default: 0,
        },
        ethereum: {
            type: Number,
            default: 0,
        },
        USDT: {
            type: Number,
            default: 0,
        },
        BNB: {
            type: Number,
            default: 0,
        },
    },
    withdrawn: {
        type: Number,
        default: 0
    },
    wallet: {
        type: {
            type: String, // Btc, Eth, ...
            default: ''
        },
        address: {
            type: String,
            default: ''
        }
    },
    transactions: [
        {
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
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Credit = mongoose.model('credit', CreditSchema);
