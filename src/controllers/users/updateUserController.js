const Joi = require("joi");

const {
    getUserById,
    getUserByEmail,
    updateUserById,
} = require("../../repositories/usersRepository");

const generateError = require("../../utils/helpers");

const schema = Joi.object().keys({
    username: Joi.string().min(4).max(120).required(),
    email: Joi.string().email().required(),
    description: Joi.string().min(4).max(200),
});

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.auth;
        const { body } = req;
        await schema.validateAsync(body);

        let { username, email, description } = body;

        const userID = await getUserById(id);

        if (email && email !== userID.email) {
            const userEmail = await getUserByEmail(email);
            if (userEmail) {
                throw generateError("Ya existe un usuario con ese email", 409);
            }
        }

        const previewDescription = userID.description;
        if (!description) {
            description = previewDescription;
        }

        await updateUserById({ id, username, email, description });

        res.send({
            status: "Success",
            message: "Usuario actualizado correctamente",
            data: { id, username, email, description },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateUser;
