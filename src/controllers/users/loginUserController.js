const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { getUserByEmail } = require("../../repositories/usersRepository");
const generateError = require("../../utils/helpers");

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(10).required(),
});

const loginUser = async (req, res, next) => {
    try {
        const { SECRET } = process.env;

        const { body } = req;
        await schema.validateAsync(body);

        const { email, password } = body;

        const user = await getUserByEmail(email);
        if (!user) {
            throw generateError("Email o password incorrecto", 401);
        }

        const { id, username, password: passwordHash } = user;

        const validPassword = await bcrypt.compare(password, passwordHash);
        if (!validPassword) {
            throw generateError("Email o passwod incorrecto", 401);
        }

        const payload = {
            id,
            username,
            email,
        };

        const token = jwt.sign(payload, SECRET, {
            expiresIn: "1d",
        });

        res.send({
            status: "Success",
            data: token,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = loginUser;
