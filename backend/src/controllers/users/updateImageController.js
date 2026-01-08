const path = require("path");
const fs = require("fs/promises");
const randomstring = require("randomstring");
const sharp = require("sharp");
const generateError = require("../../utils/helpers");
const {
    getUserByEmail,
    uploadUserImage,
} = require("../../repositories/usersRepository");

const validExtension = [".jpeg", ".jpg", ".png", ".webp"];

const updateImage = async (req, res, next) => {
    try {
        const { email } = req.auth;
        const { files } = req;

        if (!files || !files.image) {
            throw generateError("No se ha seleccionado ningún archivo");
        }

        const { image: uploadedImage } = files;

        const extension = path.extname(uploadedImage.name);

        if (!validExtension.includes(extension)) {
            throw generateError("Formato de la imagen no válido", 400);
        }

        const user = await getUserByEmail(email);

        const { id, username, image } = user;

        const pathImage = path.join(__dirname, "../../../public/profileImages");

        if (image) {
            await fs.unlink(`${pathImage}/${image}`);
        }

        const imageName = randomstring.generate(24) + ".jpg";
        const pathUploadImage = `${pathImage}/${imageName}`;

        await sharp(uploadedImage.data)
            .resize(500, 500)
            .toFile(pathUploadImage);

        await uploadUserImage(id, imageName);

        const uploadedUser = await getUserByEmail(email);
        const updatedImage = uploadedUser.image;

        res.send({
            status: "Success",
            message: "Imagen guardada y redimensionada con éxito",
            data: { username, updatedImage },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateImage;
