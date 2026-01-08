const Joi = require("joi");
const { createComment } = require("../../repositories/commentsRepository");
const { getLinkById } = require("../../repositories/linksRepository");
const generateError = require("../../utils/helpers");

const schemaId = Joi.number().integer().positive().required();
const schemaBody = Joi.object().keys({
    comment_text: Joi.string().min(5).max(500).required(),
});

const createCommentByIdLink = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const { comment_text } = body;

        await schemaId.validateAsync(id);
        await schemaBody.validateAsync(body);

        const idUser = req.auth.id;

        const linkExists = await getLinkById(id);
        if (!linkExists) {
            throw generateError(`El enlace con id${id} no existe`);
        }

        const commentId = await createComment(idUser, id, comment_text);

        res.send({
            status: "Success",
            message: `Comentario con id ${commentId} creado correctamente`,
            data: { comment_text },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = createCommentByIdLink;
