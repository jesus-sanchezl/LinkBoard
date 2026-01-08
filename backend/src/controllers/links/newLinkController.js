const path = require("path");
const fs = require("fs/promises");
const Joi = require("joi");
const randomstring = require("randomstring");
const sharp = require("sharp");

const { createLink, getLinkById } = require("../../repositories/linksRepository");
const generateError = require("../../utils/helpers");


const schema = Joi.object().keys({
    url: Joi.string().uri().min(10).max(400).required(),
    title: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(10).max(280).required(),
});

const validExtension = [".jpeg", ".jpg", ".png", ".webp"];

const newLink = async (req, res, next) => {
    try {
        const { body } = req;
        await schema.validateAsync(body);

        const userId = req.auth.id;

        const { url, title, image, description } = body;

        let imageName = "";

        if (req.files) {
            const { image: uploadedImage } = req.files;
            const extension = path.extname(uploadedImage.name);

            if (!validExtension.includes(extension)) {
                throw generateError("Formato no válido");
            }

            const pathImage = path.join(
                __dirname,
                "../../../public/linksImages"
            );

            if (image) {
                await fs.unlink(`${pathImage}/${uploadedImage}`);
            }

            imageName = randomstring.generate(24) + ".jpg";
            const pathUploadImage = `${pathImage}/${imageName}`;

            await sharp(uploadedImage.data)
                .resize(500, 500)
                .toFile(pathUploadImage);
        }

        const id = await createLink(
            userId,
            url,
            title,
            description,
            imageName,
        );

        const link = await getLinkById(id)

        res.send({
            status: "Success",
            message: `Link con id: ${id} creado correctamente`,
            data: link,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newLink;
