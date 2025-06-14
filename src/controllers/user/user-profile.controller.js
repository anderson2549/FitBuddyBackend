import UserModel from '#Schemas/user.schema.js';
import createResponse from '#Domain/response.js';
const userProfileController = async (req, res) => {
    const { id } = req;

    const existingUserById = await UserModel.findById(id).exec();
    if (!existingUserById)
        return res.status(401).send({ errors: ['user_unauthorized'] });

    const { _id, name, surname, email } = existingUserById;

    
    return res.status(200).send(createResponse(200, { _id, name, surname, email }));
};

export default userProfileController;
