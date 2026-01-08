import { useContext, useState } from "react";

import PropTypes from "prop-types";

import { sendLinkService } from "../services";
import { AuthContext } from "../context/AuthContext";

import "../styles/newLink.css";

export const NewLink = ({ addLink }) => {
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState();

    const { token } = useContext(AuthContext);

    const handleForm = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setSending(true);

            const data = new FormData(e.target);

            const linkData = await sendLinkService({ data, token });

            addLink(linkData);

            e.target.reset();
            setImage(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="newPublication">
            <h2>Añadir Publicación</h2>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="url">URL: </label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        placeholder="Introduce la URL de tu publicación (ejemplo: https://www.mipagina.com)"
                        minLength={10}
                        maxLength={400}
                        required
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="title">Título: </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Escribe un título para tu publicación"
                        minLength={3}
                        maxLength={20}
                        required
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="description">Descripción: </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Escribe una breve descripción de tu publicación"
                        minLength={10}
                        maxLength={280}
                        required
                    />
                </fieldset>

                <fieldset className="image-field">
                    <label htmlFor="image">Imagen (opcional): </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {image ? (
                        <figure>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="previewImage"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                }}
                            />
                        </figure>
                    ) : null}
                </fieldset>

                <button className="btn">Publicar</button>

                {sending ? <p>Estamos subiendo tu publicación...</p> : null}
                {error ? <p className="error">{error}</p> : null}
            </form>
        </section>
    );
};

NewLink.propTypes = {
    addLink: PropTypes.func,
};
