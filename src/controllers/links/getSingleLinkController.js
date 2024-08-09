const Joi = require("joi");
const { getLinkById } = require("../../repositories/linksRepository");

const schema = Joi.number().integer().positive().required();

const getSingleLink = async (req, res, next) => {
    try {
        const { id } = req.params;
        await schema.validateAsync(id);

        const link = await getLinkById(id);

        res.send({
            status: "Success",
            data: link,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getSingleLink;
