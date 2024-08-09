const Joi = require("joi");
const {
    getCommentById,
    deleteCommentById,
} = require("../../repositories/commentsRepository");
const generateError = require("../../utils/helpers");

const schema = Joi.number().integer().positive().required();

const deleteComment = async (req, res, next) => {
    try {
        const userId = req.auth.id;
        const { id } = req.params;
        await schema.validateAsync(id);

        const comment = await getCommentById(id);
        const { comment_text } = comment;
        if (userId !== comment.user_id) {
            throw generateError(
                "Operación no autorizada. No tienes permisos para borrar este comentario",
                401
            );
        }

        await deleteCommentById(id);

        res.send({
            status: "Success",
            message: `El comentario con id ${id} fue borrado correctamente`,
            data: { comment_text },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteComment;
