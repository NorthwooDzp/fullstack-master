const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        sendBadRequest(req, res);
    } else {
        try {
            const candidate = await User.findOne({email: req.body.email});
            if (candidate) {
                const passResult = bcrypt.compareSync(req.body.password, candidate.password);
                if (passResult) {
                    // generate token
                    const token = jwt.sign({
                        email: candidate.email,
                        userId: candidate._id
                    }, keys.jwtStr, {
                        expiresIn: 60 * 60 * 8
                    });
                    res.status(200).json({
                        token: `Bearer ${token}`
                    });
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
        } catch (e) {
            errorHandler(res, e);
        }

    }

};

module.exports.register = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        sendBadRequest(req, res);
    } else {
        try {
            const candidate = await User.findOne({email: req.body.email});
            if (!candidate) {
                // send error
                const salt = bcrypt.genSaltSync(16);
                const user = new User({
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, salt)
                });
                await user.save();
                res.status(201).json(user);
            } else {
                res.status(409).json({
                    message: 'User with this email already exist'
                });
            }
        } catch (e) {
            errorHandler(res, e);
        }

    }
};

module.exports.checkEmail = async (req, res) => {
    if (!req.body.email) {
        sendBadRequest(req, res);
    } else {
        try {
            const candidate = await User.findOne({email: req.body.email});
            if (candidate) {
                res.status(400).end();
            } else {
                res.status(404).end();
            }
        } catch (e) {
            errorHandler(res, e);
        }

    }
};

const sendBadRequest = (req, res) => {
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
};