const Joi = require("joi");
const path = require("path");
const fs = require("fs").promises;
const randomstring = require("randomstring");
const sharp = require("sharp");

const {
    getUserById,
    getUserByEmail,
    updateUserById,
    uploadUserImage,
} = require("../../repositories/usersRepository");

const generateError = require("../../utils/helpers");

const schema = Joi.object().keys({
    username: Joi.string().min(4).max(120).required(),
    email: Joi.string().email().required(),
    description: Joi.string().max(200).allow("").optional(),
});

const validExtension = [".jpeg", ".jpg", ".png", ".webp"];

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.auth;
        const { body } = req;
        await schema.validateAsync(body);

        let { username, email, description, image } = body;

        const userID = await getUserById(id);
        const user = await getUserByEmail(email);

        if (user && user.id != id) {
            throw generateError("Ya existe un usuario con ese email", 409);
        }

        description = description !== undefined ? description : userID.description;


        if (req.files) {
            const { image } = req.files;
            const extension = path.extname(image.name);

            if (!validExtension.includes(extension)) {
                throw generateError("Formato no válido", 400);
            }

            const pathImage = path.join(
                __dirname,
                "../../../public/profileImages"
            );

            if (image) {
                const currentImageName = userID.image; // Obtén el nombre actual desde la BD u otra fuente
                if (currentImageName) {
                    await fs.unlink(`${pathImage}/${currentImageName}`);
                }
            }

            const imageName = randomstring.generate(24) + ".jpg";
            const pathUploadImage = `${pathImage}/${imageName}`;

            await sharp(image.data).resize(500, 500).toFile(pathUploadImage);
            await uploadUserImage(id, imageName);
        }

        await updateUserById({ id, username, email, description });

        const newUser = await getUserByEmail(email)
        const newImage = newUser.image

        res.send({
            status: "Success",
            message: "Usuario actualizado correctamente",
            data: { id, username, email, description, newImage },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateUser;
