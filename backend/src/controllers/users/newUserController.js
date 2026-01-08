const Joi = require("joi");
const { createUser } = require("../../repositories/usersRepository");

const schema = Joi.object().keys({
    username: Joi.string().min(4).max(120).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required(),
    repeatPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        "any.only": "Las contraseñas no coinciden"
    }),
    
});

const newUser = async (req, res, next) => {
    try {
        const { body } = req;
        await schema.validateAsync(body);

        const { username, email, password } = body;

        const id = await createUser(username, email, password);

        res.send({
            status: "OK",
            message: `User created with id: ${id}`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newUser;
