const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.login = (req, res) => {
    if (req.body.email && req.body.password) {
        res.status(200).json({
            email: req.body.email,
            password: req.body.password
        });
    } else {
        res.status(401).send('User is not authorized');
    }
};

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        // send error
        res.status(409).json({
            message: 'User with this email already exist'
        });
    } else {
        const salt = bcrypt.genSaltSync(16);
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt)
        });
        user.save()
            .then(() => {
                res.status(201).json(user);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
};
