const errorHandler = require('../utils/errorHandler');
const Order = require('../models/Order');

module.exports.getAll = async (req, res) => {
    try {

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.crete = async (req, res) => {
    try {
        const lastOrder = await Order
            .findOne({user: req.user.id})
            .sort({date: -1});
        const maxOrder = lastOrder ? lastOrder.order : 0;

        const order = await new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save();
        res.status(201).json(order);
    } catch (e) {
        errorHandler(res, e);
    }
};