const { getUserByEmail } = require("../../repositories/usersRepository");
const generateError = require("../../utils/helpers");

const getUserProfile = async (req, res, next) => {
    try {
        const { email } = req.auth;

        const user = await getUserByEmail(email);
        if (!user) {
            throw generateError(
                "No existe usuario con ese email y/o password",
                404
            );
        }

        const { id, username, image, description, created_at } = user;

        res.send({
            status: "Success",
            message: `Usuario con id: ${id}`,
            data: { id, username, email, image, description, created_at },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUserProfile;
