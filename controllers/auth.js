module.exports.login = (req, res) => {
    if (req.body.email && req.body.password) {
        res.status(200).json({
            email: req.body.email,
            password: req.body.password
        });
    } else {
        res.status(401).send('User is not authorized')
    }

};

module.exports.register = (req, res) => {
    res.status(200).send({
        register: 'from controller'
    });
};