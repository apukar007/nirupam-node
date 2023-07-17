// protect routes
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authguard = async (req, res, next) => {

    //const token = req.header('Authorization').replace('Bearer ', '');
    const token = req.header('Authorization');

    const data = jwt.verify(token, process.env.JWT_KEY);

    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });

        if(!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();

    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
}


// create a middleware to check if user is admin
const admin = async (req, res, next) => {
    if(req.user.role === 'admin') {
        next();
    }else{
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
}

module.exports = { authguard, admin };
