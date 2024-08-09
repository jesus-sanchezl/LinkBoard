const path = require("path");
const Joi = require("joi");
const randomstring = require("randomstring");
const sharp = require("sharp");

const {
    getLinkById,
    updateLinkById,
} = require("../../repositories/linksRepository");
const generateError = require("../../utils/helpers");

const schemaId = Joi.number().integer().positive().required();

const schemaBody = Joi.object().keys({
    url: Joi.string().uri().required(),
    titulo: Joi.string().min(3).max(400).required(),
    description: Joi.string().min(10).max(200).required(),
});

const validExtension = [".jpeg", ".jpg", ".png", ".webp"];

const updateLink = async (req, res, next) => {
    try {
        const { id } = req.params;
        await schemaId.validateAsync(id);
        const { body } = req;
        await schemaBody.validateAsync(body);

        const { url, titulo, description, image } = body;

        const userId = req.auth.id;

        const link = await getLinkById(id);

        if (userId !== link.user_id) {
            throw generateError(
                "Operación no autorizada. No tienes permisos para actualizar este link",
                401
            );
        }

        let imageName = link.image;

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
            console.log("Path Image:", pathImage);

            if (image) {
                await fs.unlink(`${pathImage}/${uploadedImage}`);
            }

            imageName = randomstring.generate(24) + ".jpg";
            const pathUploadImage = `${pathImage}/${imageName}`;

            await sharp(uploadedImage.data)
                .resize(500, 500)
                .toFile(pathUploadImage);
        }

        await updateLinkById(id, url, titulo, imageName, description);

        res.send({
            status: "Success",
            message: `El link con id ${id} fue modificado correctamente`,
            data: { url, titulo, description, imageName },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateLink;
