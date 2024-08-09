const Joi = require("joi");
const { createUser } = require("../../repositories/usersRepository");

const schema = Joi.object().keys({
    username: Joi.string().min(4).max(120).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required(),
    description: Joi.string().min(4).max(200),
});

const newUser = async (req, res, next) => {
    try {
        const { body } = req;
        await schema.validateAsync(body);

        const { username, email, password, description } = body;

        const id = await createUser(username, email, password, description);

        res.send({
            status: "OK",
            message: `User created with id: ${id}`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newUser;
