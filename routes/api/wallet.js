const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');


const Wallet = require('../../models/Wallet');


//@route  GET api/wallet
//@desc   Get wallet
//access  private
router.get('/', auth, async (req, res) => {
    const walletStore = [];

    try {

        const wallet = await Wallet.find({});
        wallet.forEach(data => {
            walletStore.push({ id: data.id, bitcoin: data.bitcoin, usdt: data.usdt, ethreum: data.ethereum, bnb: data.bnb })
        })
        res.json(walletStore)

    } catch (err) {
        console.log(err)
    }
});


//@route  GET api/wallet/:id
//@desc   Get all wallet
//access  private
router.get('/:id', auth, async (req, res) => {
    let box = {}
    try {
        const wallet = await Wallet.findOne({ _id: req.params.id });

        box.id = wallet.id;
        box.ethereum = wallet.ethereum;
        box.bitcoin = wallet.bitcoin;
        box.bnb = wallet.bnb;
        box.usdt = wallet.usdt;

        res.json(box);
    } catch (err) {
        console.log(err)
    }
})



//@route  PUT api/wallet/:id
//@desc   Edit wallet
//access  private
router.put('/:id', auth, async (req, res) => {
    const { bitcoin, ethereum, bnb, usdt } = req.body;

    let box = {};
    let walletStore = {};

    try {
        if (bitcoin) box.bitcoin = bitcoin;
        if (ethereum) box.ethereum = ethereum;
        if (bnb) box.bnb = bnb;
        if (usdt) box.usdt = usdt;

        let wallet = await Wallet.findOne({ _id: req.params.id });

        wallet = await Wallet.findByIdAndUpdate(
            wallet._id,
            { $set: box },
            { new: true }
        );

        walletStore.id = wallet.id;
        walletStore.bitcoin = wallet.bitcoin;
        walletStore.ethereum = wallet.ethereum;
        walletStore.usdt = wallet.usdt;
        walletStore.bnb = wallet.bnb;

        res.json(walletStore)

    } catch (err) {
        console.log(err)
    }
})

module.exports = router