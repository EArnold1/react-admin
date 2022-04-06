const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    bitcoin: {
        type: String,
        default: '19KhcwS3kR4NT4ectfMvGdG3auLi1vDJLx',
    },
    ethereum: {
        type: String,
        default: '0x602b9dfedebab35974d12b8e4dcc38643bccd681',
    },
    usdt: {
        type: String,
        default: '0x602b9dfedebab35974d12b8e4dcc38643bccd681',
    },
    bnb: {
        type: String,
        default: 'TEAMq6WP4ckMk42kVEmVzgwZdip4JnNu1B',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Wallet = mongoose.model('wallet', WalletSchema);
