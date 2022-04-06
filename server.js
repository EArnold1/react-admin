const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const path = require('path');


const app = express()
app.use(cors({
    'Access-Control-Expose-Headers': 'Content-Range'
}))

//db connection
connectDB()



//init middleware
app.use(express.json({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers", "X-Total-Count, Content-Range");
    next();
});


//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/credit', require('./routes/api/credit'));
app.use('/api/transactions', require('./routes/api/transactions'));
// app.use('/api/wallet', require('./routes/api/wallet'));
app.use('/api/auth', require('./routes/api/auth'));


//Server static assets in prod
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Api has started running on port ${PORT}`));
