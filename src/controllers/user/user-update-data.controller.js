import UserModel from '#Schemas/user.schema.js';
import createResponse from '#Domain/response.js';
const userUpdateDataController = async (req, res) => {
    const { id } = req;
    const { name, surname } = req.body;

    const existingUserById = await UserModel.findById(id).exec();
    if (!existingUserById)
        return res.status(401).send({ errors: ['user_unauthorized'] });

    existingUserById.name = name;
    existingUserById.surname = surname;

    await existingUserById.save();

    return res.status(200).send(createResponse(200,'user_updated'));
};

export default userUpdateDataController;
