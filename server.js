require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models/database');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));
app.use('/baskets', require('./routes/customerbasket'));

app.get('/', (req, res) => {
    res.send('GolfGear backend is now live!');
});

app.post('/test', (req, res) =>{
    console.log('TEST HIT', req.body);
    res.json({message: 'Test endpoint hit successfully',body: req.body});
});

const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});