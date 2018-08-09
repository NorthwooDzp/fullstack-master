const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

module.exports.login = async function (req, res) {
    if (!req.body.email || !req.body.password) {
        sendBadRequest(req, res);
    } else {
        const candidate = await User.findOne({email: req.body.email});
        if (candidate) {
            const passResult = bcrypt.compareSync(req.body.password, candidate.password);
            if (passResult) {
                // generate token
                const token = jwt.sign({
                    email: candidate.email,
                    id: candidate._id
                }, keys.jwtStr, {
                    expiresIn: 60*120
                });
                res.status(200).json({
                    token: `Bearer ${token}`
                })
            } else {
                res.status(401).json({
                    message: 'Incorrect Password. Try again'
                });
            }
        } else {
            res.status(404).json({
                message: 'User with this email does not exist'
            });
        }
    }

};

module.exports.register = async function (req, res) {
    if (!req.body.email || !req.body.password) {
        sendBadRequest(req, res);
    } else {
        const candidate = await User.findOne({email: req.body.email});
        if (!candidate) {
            // send error
            const salt = bcrypt.genSaltSync(16);
            const user = new User({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, salt)
            });
            try {
                await user.save();
                res.status(201).json(user);
            } catch (e) {
                res.status(500).json(e);
            }
        } else {
            res.status(409).json({
                message: 'User with this email already exist'
            });

        }
    }
};

module.exports.checkEmail = async function (req, res) {
    if (!req.body.email) {
        sendBadRequest(req, res);
    } else {
        const candidate = await User.findOne({email: req.body.email});
        if (candidate) {
            res.status(400).end();
        } else {
            res.status(404).end();
        }
    }
};

function sendBadRequest(req, res) {
    if (!req.body.email && !req.body.password) {
        res.status(400).json({
            message: 'Email and password are required!'
        });
    } else if (!req.body.email) {
        res.status(400).json({
            message: 'Email is required'
        });
    } else if (!req.body.password) {
        res.status(400).json({
            message: 'Password is required'
        });
    }
}