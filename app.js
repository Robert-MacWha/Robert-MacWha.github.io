const express  = require('express');
const morgan   = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');

const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const { dbURI, authToken } = require('./keys');

// express app
const app = express();

// connect to mongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    app.listen(3000); // start the app once connected to mongoDB
})
.catch((err) => { console.log(err) });

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(express.static('public'));
app.use(express.static('node_modules'));

// routes
app.get('*', checkUser);
app.get('/', checkUser, (req, res) => {
    res.render('index', { admin: (res.locals.user != null) });  
});

// project routes
app.use('/portfolio', projectRoutes);

// auth routes
app.use('/', authRoutes);

// 404s
app.use(checkUser, (req, res) => {
    res.status(404).render('404', { admin: (res.locals.user != null) });
});