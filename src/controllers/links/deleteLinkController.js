const Joi = require("joi");
const {
    getLinkById,
    deleteLinkById,
} = require("../../repositories/linksRepository");
const generateError = require("../../utils/helpers");

const schema = Joi.number().integer().positive().required();

const deleteLink = async (req, res, next) => {
    try {
        const userId = req.auth.id;

        const { id } = req.params;
        await schema.validateAsync(id);

        const link = await getLinkById(id);

        if (userId !== link.user_id) {
            throw generateError(
                "Operación no autorizada. No tienes permisos para borrar este link",
                401
            );
        }

        await deleteLinkById(id);

        res.send({
            status: "Success",
            message: `El link con id ${id} ha sido borrado correctamente`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteLink;
