const Joi = require("joi");
const bcrypt = require("bcrypt");

const generateError = require("../../utils/helpers");
const {
    updatePassordUserById,
    getUserById,
} = require("../../repositories/usersRepository");

const schemaPassword = Joi.string().min(4).max(20).required();

const updatePassword = async (req, res, next) => {
    try {
        const { id } = req.auth;
        const { password } = req.body;
        await schemaPassword.validateAsync(password);

        if (!password || password.trim() === "") {
            throw generateError(" La contraseña no puede estar vacía", 400);
        }

        const currentUser = await getUserById(id);
        if (!currentUser) {
            throw generateError("Usuario no encontrado", 404);
        }

        const isSamePassword = await bcrypt.compare(
            password,
            currentUser.password
        );
        if (isSamePassword) {
            throw generateError(
                "La contraseña no puede ser la misma que la anterior",
                400
            );
        }

        const passwordHash = await bcrypt.hash(password, 10);
        await updatePassordUserById(id, passwordHash);

        res.send({
            status: "Success",
            message: "Contraseña actualizada correctamente",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updatePassword;
