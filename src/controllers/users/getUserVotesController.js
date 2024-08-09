const Joi = require("joi");
const { checkVoted } = require("../../repositories/ratingsRepository");
const { getLinkById } = require("../../repositories/linksRepository");
const generateError = require("../../utils/helpers");

const schema = Joi.number().integer().positive().required();

const getUserVotes = async (req, res, next) => {
    try {
        const idUser = req.auth.id;
        const { id: idLink } = req.params;

        await schema.validateAsync(idLink);

        const link = await getLinkById(idLink);
        if (!link) {
            throw generateError(
                "No se encontró ninguna publicación con ese id",
                400
            );
        }

        const isVoteRegistered = await checkVoted(idUser, idLink);

        res.send({
            status: "Success",
            data: isVoteRegistered,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUserVotes;
