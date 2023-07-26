import jwt from 'jsonwebtoken';

const generateToken = user => jwt.sign(
    {
        userId: user.userId,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || '75186ae9d2b71f54360d',
    {
        expiresIn: '30d',
    }
);

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(
            token,
            process.env.JWT_SECRET || '75186ae9d2b71f54360d',
            (err, decode) => {
                if (err) {
                    res.status(401).send({
                        message: 'Invalid Token',
                    });
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        res.status(401).send({
            message: 'No Token',
        });
    }
};

const isAdmin = ({ user }, res, next) => {
    if (user && user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'Invalid Admin Token' });
    }
};

const isUUID = (str) => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexExp.test(str);
}

export { generateToken, isAuth, isAdmin, isUUID };