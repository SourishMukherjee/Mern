const express = require('express');
const db= require('./db');
const bodyParser= require('body-parser');
const path=require('path');
const items =require('./routes/api/items');
const app=express();

app.use(bodyParser.json());
app.use('/api/items',require('./routes/api/items'));
app.use('/api/users',require('./routes/api/Users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/screens',require('./routes/api/screens'));
app.use('/api/draft',require('./routes/api/draft'));

require("./routes/api/items");

const port = process.env.PORT || 5000;

app.listen(port,()=> console.log(`Server started on port ${port}`));