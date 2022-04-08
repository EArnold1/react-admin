const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth');

const Transaction = require('../../models/Transaction');



//@route  GET api/credit/transactions
//@desc   Get transactions
//access  Private
router.get('/', auth, async (req, res) => {
    let transactions = []
    try {

        const trans = await Transaction.find({}).sort({ date: -1 }).populate('userId', [
            'firstname',
            'lastname',
            'email',
        ]);

        trans.forEach((data) => {
            transactions.push({
                amount: data.amount,
                status: data.status,
                plan: data.plan,
                id: data.id,
                currency: data.currency,
                transactionid: data.transactionId,
                date: data.date,
                name: `${data.userId.firstname} ${data.userId.lastname}`,
                email: data.userId.email
            })
        })

        res.setHeader('Content-Range', 'bytes 0-10/100');
        res.json(transactions);
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Server Error' });
    }
})


//@route  GET api/transactions/:id
//@desc   Get transaction
//access  Private
router.get('/:id', auth, async (req, res) => {
    let box = {};
    try {
        let trans = await Transaction.findOne({ _id: req.params.id }).populate('userId', [
            'firstname',
            'lastname',
            'email',
        ])


        box.userId = trans.userId.id
        box.name = `${trans.userId.firstname} ${trans.userId.lastname}`
        box.email = trans.userId.email
        box.id = trans.id
        box.amount = trans.amount
        box.status = trans.status
        box.currency = trans.currency
        box.plan = trans.plan
        box.type = trans.type
        box.date = trans.date

        res.json(box)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Server Error' });
    }
})


//@route  PUT api/transactions/:userId/:id
//@desc   Edit a transaction
//access  Private
router.put('/:id', auth, async (req, res) => {

    const { status } = req.body;

    const transactBox = {
        status
    };

    const box = {}

    try {


        let trans = await Transaction.findOne({ _id: req.params.id });

        trans = await Transaction.findByIdAndUpdate(
            trans._id,
            { $set: transactBox },
            { new: true }
        );

        box.status = trans.status
        box.id = trans.id
        box.amount = trans.amount
        box.status = trans.status
        box.currency = trans.currency
        box.plan = trans.plan
        box.type = trans.type
        box.date = trans.date

        res.json(box);

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Server Error' });
    }

})


module.exports = router