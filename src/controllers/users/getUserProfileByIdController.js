const Joi = require("joi");
const { getUserById } = require("../../repositories/usersRepository");

const schema = Joi.number().integer().positive().required();

const getUserProfileById = async (req, res, next) => {
    try {
        const { id } = req.params;
        await schema.validateAsync(id);

        const user = await getUserById(id);

        const { username, email, image, description, created_at } = user;

        res.send({
            status: "Success",
            data: { id, username, email, image, description, created_at },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getUserProfileById;
