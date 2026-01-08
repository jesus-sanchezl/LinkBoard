const Joi = require("joi");
const {
    getLinksByUserId,
    getUserById,
} = require("../../repositories/usersRepository");
const generateError = require("../../utils/helpers");

const schema = Joi.number().integer().positive().required();

const getUserLinksById = async (req, res, next) => {
    try {
        const { id } = req.params;
        await schema.validateAsync(id);

        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);

        if (isNaN(limit) || isNaN(offset) || limit < 0 || offset < 0) {
            throw generateError("Valor de limit u offset incorrectos", 400);
        }

        const user = await getUserById(id);
        if (!user) {
            throw generateError("No existe ningún usuario con ese id", 404);
        }

        const links = await getLinksByUserId(id, limit, offset);

        if (!links || links.length === 0) {
            throw generateError(
                "El usuario aún no ha hecho ninguna publicación",
                404
            );
        }

        res.send({
            status: "Success",
            data: links,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUserLinksById;
