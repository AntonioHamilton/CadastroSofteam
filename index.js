const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routers/userRouter');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cadastroSofteam');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/hello', (req, res) => res.json('funcionou!'));

app.use('/user', userRouter());

module.exports = app.listen(8000, () => console.log('tá rodando'));