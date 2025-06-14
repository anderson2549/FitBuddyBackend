import { SALT } from '#Constants/salt.js';
import UserModel from '#Schemas/user.schema.js';
import { compare, hash } from 'bcrypt';
import createResponse from '#Domain/response.js';
const userUpdatePasswordController = async (req, res) => {
    const { id } = req;
    const { oldPassword, newPassword } = req.body;

    const existingUserById = await UserModel.findById(id).exec();
    if (!existingUserById)
        return res.status(401).send({ errors: ['user_unauthorized'] });

    const checkPassword = await compare(oldPassword, existingUserById.password);
    if (!checkPassword)
        return res.status(401).send({ errors: ['credentials_wrong'] });

    const hashedPassword = await hash(newPassword, SALT);
    existingUserById.password = hashedPassword;

    await existingUserById.save();

    
    return res.status(200).send(createResponse(200,'user_password_updated'));

};

export default userUpdatePasswordController;
