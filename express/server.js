const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// secrets
require('dotenv').config();

// express server config
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());

// mongo connection
const URI = process.env.ATLAS_URI;
mongoose.connect(URI, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// serving build static files
app.use(express.static(path.resolve(__dirname, "../react", "build")));


// api imports ==============================================================
const dogRouter = require('./routes/dogs');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const dateRouter = require('./routes/dogDate');

// lock api calls to only users with token
// token is grabbed from res.header("auth-token")
// do this after
const verifyToken = require('./validate-token');

app.use('/api/auth', authRouter);
app.use('/api/dogs', /* verifyToken, */ dogRouter);
app.use('/api/users', /* verifyToken, */ userRouter);
app.use('/api/date', /* verifyToken, */ dateRouter);

// ==========================================================================

// redirecting everything else to the main build index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../react", "build", "index.html"));
})

// start express server
app.listen(PORT, () => {
    console.log(`server starting on port: ${PORT}`);
});