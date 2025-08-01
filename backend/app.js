const express = require('express');
const cors = require('cors');
const app = express();

// Adicione estes middlewares ANTES das rotas!
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.use('/uploads', express.static('uploads'));

module.exports = app;