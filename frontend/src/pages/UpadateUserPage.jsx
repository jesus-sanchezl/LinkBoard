import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMyUserDataService, UpdateUserService } from "../services";
import { AuthContext } from "../context/AuthContext";

import "../styles/updateProfile.css";
import "../styles/popUp.css";

export const UpdateUserPage = () => {
    const { id } = useParams();

    const { token, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [currentImage, setCurrentImage] = useState(null);
    const [image, setImage] = useState(null);

    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userData = await getMyUserDataService(token);

                setUsername(userData.username);
                setEmail(userData.email);
                setDescription(userData.description);

                if (userData.image) {
                    const imageUrl = `${import.meta.env.VITE_BACKEND}/images/${
                        userData.image
                    }`;
                    setCurrentImage(imageUrl);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        loadUserData();
    }, [token]);

    const handleForm = async (e) => {
        e.preventDefault();
        setError("");
        try {
            setShowModal(true);
        } catch (error) {
            setError(error.message);
            setShowModal(false);
        }
    };

    const handleLogout = async () => {
        try {
            const data = new FormData();
            data.append("username", username);
            data.append("email", email);
            data.append("description", description || "");

            if (image) {
                data.append("image", image);
            }

            const updatedUser = await UpdateUserService({ token, data });

            updatedUser.image = updatedUser.newImage;
            delete updatedUser.newImage;

            updateUser(updatedUser);

            navigate(`/user/${id}`);
        } catch (error) {
            setError(error.message);
            setShowModal(false);
        }
    };

    return (
        <section className="editProfile">
            <h2>Actualizar usuario</h2>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="description">Acerca de ti:</label>
                    <textarea
                        
                        id="description"
                        name="description"
                        placeholder="Max 200 character"
                        maxLength={200}
                        value={description || ""}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </fieldset>

                <fieldset className="imageField">
                    <label htmlFor="image">Avatar:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {image ? (
                        <figure>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview Avatar"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                }}
                            />
                        </figure>
                    ) : currentImage ? (
                        <figure>
                            <img
                                src={currentImage}
                                style={{ width: "100px" }}
                                alt="Current Avatar"
                            />
                        </figure>
                    ) : null}
                </fieldset>

                <button className="btn">Actualizar</button>
                {error ? <p className="error">{error}</p> : null}
            </form>
            {showModal && (
                <div className="modalUpdate">
                    <div className="modalText">
                        <p>¿Desea confirmar los cambios?</p>

                        <div className="modalbuttons">
                            <button onClick={handleLogout}>Confirmar</button>
                            <button onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Link to={"/user/password"} className="btnPassword">
                Cambiar Contraseña
            </Link>
        </section>
    );
};
