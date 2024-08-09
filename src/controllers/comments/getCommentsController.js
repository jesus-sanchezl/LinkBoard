const Joi = require("joi");
const { getCommentsById } = require("../../repositories/commentsRepository");
const generateError = require("../../utils/helpers");
const { getLinkById } = require("../../repositories/linksRepository");

const schema = Joi.number().integer().positive().required();

const getComments = async (req, res, next) => {
    try {
        const { id } = req.params;
        await schema.validateAsync(id);

        const linkExists = await getLinkById(id);
        if (!linkExists) {
            throw generateError(`El enlace con id${id} no existe`);
        }

        const comments = await getCommentsById(id);

        if (comments.length === 0) {
            throw generateError(
                "Este link aún no tiene comentarios. ¡Sé el primero en dejar tu opinión",
                400
            );
        }

        res.send({
            status: "Success",
            data: comments,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getComments;
