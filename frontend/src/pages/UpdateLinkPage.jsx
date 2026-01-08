import { useContext } from "react";
import {  useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "../context/AuthContext";
import { useUpdateLink } from "../hooks/useUpdateLink";
import BackButton from "../components/BackButton";

import '../styles/editLink.css'

export const UpdateLinkPage = ({ displayBackButton = false }) => {
    
    const { id } = useParams();
    const { token } = useContext(AuthContext);


    const {
        updateUrl,
        setUpdateUrl,
        updateTitle,
        setUpdateTitle,
        updateDescription,
        setUpdateDescription,
        updateImage,
        setUpdateImage,
        error,
        handleForm,
    } = useUpdateLink(id, token);




    return (
        <section className="editPublication">
            <h2>Editar publicación</h2>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="url">Url: </label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        placeholder="Max 400 characters"
                        minLength={10}
                        maxLength={400}
                        value={updateUrl}
                        onChange={(e) => setUpdateUrl(e.target.value)}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="titulo">Título: </label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        placeholder="Max 15 characters"
                        minLength={3}
                        maxLength={15}
                        value={updateTitle}
                        onChange={(e) => setUpdateTitle(e.target.value)}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="description">Descripción: </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Max 280 characters"
                        minLength={10}
                        maxLength={280}
                        value={updateDescription}
                        onChange={(e) => setUpdateDescription(e.target.value)}
                    />
                </fieldset>

                <fieldset className="imageField">
                    <label htmlFor="image">Imagen: </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/"
                        onChange={(e) => setUpdateImage(e.target.files[0])}
                    />

                    {updateImage ? (
                        updateImage instanceof File ? (
                            <figure>
                                <img
                                    src={URL.createObjectURL(updateImage)}
                                    style={{ width: "100px" }}
                                    alt="Preview"
                                />
                            </figure>
                        ) : (
                            <figure>
                                <img
                                    src={`${
                                        import.meta.env.VITE_BACKEND
                                    }/images/${updateImage}`}
                                    style={{ width: "100px" }}
                                    alt="Preview"
                                />
                            </figure>
                        )
                    ) : null}
                </fieldset>

                <button className="btn">Guardar cambios</button>

                {error ? <p className="error">{error}</p> : null}
            </form>

            <div>
                <BackButton displayBackButton={displayBackButton} />
            </div>
        </section>
    );
};

UpdateLinkPage.propTypes = {
    displayBackButton: PropTypes.bool,
};
