const jwt = require('jsonwebtoken');
const JWT_SECRET = 'rakeshisagoodb$oy';

const fetchuser = (req, res, next) => {
    // get the user from the jwt token and append add, id to req object
    const token = req.header('auth-token');
    if (!token) res.status(401).send({ error: 'please authenticate using valid token id' })
    try {
        const data = jwt.verify(token, JWT_SECRET);

        req.user = data.user;

        next();
    }
    catch (error) {
        res.status(401).send({ error: 'please authenticate using valid token id' })
    }
}

module.exports = fetchuser;