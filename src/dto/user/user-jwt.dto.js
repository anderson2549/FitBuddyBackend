import { jwtVerify } from 'jose';

const userJWTDTO = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).send({ errors: ['user_unauthorized'] });

    const jwt = authorization.split(' ')[1];

    if (!jwt)
        return res.status(401).send({ errors: ['user_unauthorized'] });

    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(
            jwt,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );

        req.id = payload.id;

        next();
    } catch (error) {
        return res.status(401).send({ errors: ['user_unauthorized'] });
    }
};

export default userJWTDTO;
