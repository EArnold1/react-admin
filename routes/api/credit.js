const express = require('express')
const router = express.Router()
const config = require('config');
const auth = require('../../middleware/auth');

const Credit = require('../../models/Credit');


//@route  GET api/credit
//@desc   Get all user's credit
//access  private
router.get('/', auth, async (req, res) => {
    let banks = []
    try {
        const credit = await Credit.find({}).sort({ date: -1 }).populate('userId', [
            'firstname',
            'lastname',
            'email',
        ]);

        credit.forEach((data) => {
            banks.push({
                userId: data.userId.id, id: data.id, name: `${data.userId.firstname} ${data.userId.lastname}`, email: data.userId.email, balance: data.balance, investment: data.investment, profit: data.profit, plan: data.plan, bitcoin: data.cryptos.bitcoin, ethereum: data.cryptos.ethereum,
                usdt: data.cryptos.USDT, bnb: data.cryptos.BNB,
                withdrawn: data.withdrawn

            })
        })
        res.setHeader('Content-Range', 'bytes 0-10/100');
        res.json(banks);
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Server Error' });
    }
})

//@route  GET api/credit/:id
//@desc   Get account
//access  Private
router.get('/:id', auth, async (req, res) => {
    let box = {};
    try {
        const credit = await Credit.findOne({ _id: req.params.id })
        box.id = credit.id
        box.balance = credit.balance
        box.profit = credit.profit
        box.investment = credit.investment
        box.bitcoin = credit.cryptos.bitcoin
        box.ethereum = credit.cryptos.ethereum
        box.bnb = credit.cryptos.BNB
        box.usdt = credit.cryptos.USDT
        box.plan = credit.plan
        box.withdrawn = credit.withdrawn
        res.json(box)
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
})



//@route  PUT api/credit
//@desc   Edit account
//access  Private
router.put('/:id', auth, async (req, res) => {
    const { plan, balance, investment, profit, withdrawn, bitcoin, bnb, usdt, ethereum } = req.body;
    let box = {};

    const cBank = {
        cryptos: {}
    };
    if (plan) cBank.plan = plan;
    if (balance) cBank.balance = balance;
    if (withdrawn) cBank.withdrawn = withdrawn;
    if (profit) cBank.profit = profit;
    if (investment) cBank.investment = investment;
    if (bitcoin) cBank.cryptos.bitcoin = bitcoin;
    if (ethereum) cBank.cryptos.ethereum = ethereum;
    if (usdt) cBank.cryptos.USDT = usdt;
    if (bnb) cBank.cryptos.BNB = bnb;

    try {
        let userCredit = await Credit.findOne({ _id: req.params.id });

        userCredit = await Credit.findByIdAndUpdate(
            userCredit._id,
            { $set: cBank },
            { new: true }
        );

        box.id = userCredit.id
        box.balance = userCredit.balance
        box.profit = userCredit.profit
        box.plan = userCredit.plan
        box.investment = userCredit.investment
        box.withdrawn = userCredit.withdrawn
        box.bitcoin = userCredit.cryptos.bitcoin
        box.ethereum = userCredit.cryptos.ethereum
        box.usdt = userCredit.cryptos.USDT
        box.bnb = userCredit.cryptos.BNB

        res.json(box);

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Server Error' });
    }
});


module.exports = router