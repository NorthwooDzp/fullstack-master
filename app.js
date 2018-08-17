const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const categoryRoutes = require('./routes/category');
const analyticsRoutes = require('./routes/analytics');
const positionRoutes = require('./routes/position');


app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('cors')());

app.use(passport.initialize());

require('./middleware/passport')(passport);


const guard = passport.authenticate('jwt', {session: false});

app.use('/api/auth', authRoutes);
app.use('/api/order', guard, orderRoutes);
app.use('/api/analytics', guard, analyticsRoutes);
app.use('/api/category', guard, categoryRoutes);
app.use('/api/position', guard, positionRoutes);

module.exports = app;