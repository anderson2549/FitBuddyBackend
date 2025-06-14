import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
import createResponse from '#Domain/response.js';
const userUpdateEmailController = async (req, res) => {
    const { id } = req;
    const { email, password } = req.body;

    const existingUserById = await UserModel.findById(id).exec();
    if (!existingUserById)
        return res.status(401).send({ errors: ['user_unauthorized'] });

    const checkPassword = await compare(password, existingUserById.password);
    if (!checkPassword)
        return res.status(401).send({ errors: ['credentials_wrong'] });

    existingUserById.email = email;

    await existingUserById.save();

    return res.status(200).send(createResponse(200,'user_email_updated'));
};

export default userUpdateEmailController;
