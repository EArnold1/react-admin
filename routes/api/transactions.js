const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth');

const Credit = require('../../models/Credit');



//@route  GET api/credit/transactions
//@desc   Get transactions
//access  Private
router.get('/', auth, async (req, res) => {
    let banks = []
    try {
        const credit = await Credit.find({}).sort({ date: -1 }).populate('userId', [
            'firstname',
            'lastname',
            'email',
        ]);

        let userDetails = credit[0]

        credit[0].transactions.forEach((data) => {
            banks.push({
                amount: data.amount,
                status: data.status,
                plan: data.plan,
                id: data.id,
                currency: data.currency,
                transactionId: data.transactionId,
                date: data.date,
                userId: userDetails.id,
                name: `${userDetails.userId.firstname} ${userDetails.userId.lastname}`,
                email: userDetails.userId.email

            })
        })

        res.setHeader('Content-Range', 'bytes 0-10/100');
        res.json(banks);
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Server Error' });
    }
})


//@route  GET api/transactions/:id
//@desc   Get transaction
//access  Private
router.get('/:userid/:id', auth, async (req, res) => {
    let box = {};
    try {
        let credit = await Credit.findOne({ _id: req.params.userid }).populate('userId', [
            'firstname',
            'lastname',
            'email',
        ])


        box.userId = credit.userId.id
        box.name = `${credit.userId.firstname} ${credit.userId.lastname}`
        box.email = credit.userId.email

        credit = credit.transactions.filter(data => data.id === req.params.id)

        credit.forEach((data) => {
            box.id = data.id
            box.amount = data.amount
            box.status = data.status
            box.currency = data.currency
            box.plan = data.plan
            box.type = data.type
            box.date = data.date
        })

        res.json(box)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Server Error' });
    }
})


//@route  PUT api/transactions/:userId/:id
//@desc   Edit a transaction
//access  Private
router.put('/:userId/:id', auth, async (req, res) => {

    const { status, amount } = req.body;

    // const box = {};

    try {

        let credit = await Credit.findOne({ _id: req.params.userId });

        let transObj = credit.transactions

        const transUpdate = credit.transactions.forEach((t) => {
            if (t.id === req.params.id) {
                if (amount) t.amount = amount
                if (status) t.status = status;
                box = t
            }
        });


        await credit.save();

        res.json(box)

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'Server Error' });
    }

})


module.exports = router