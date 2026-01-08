import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { ErrorMessage } from "../components/ErrorMessage";
import { UserLinks } from "../components/UserLinks";
import { Avatar } from "@mui/material";

import imageDefault from "../assets/default.jpeg";

import "../styles/profile.css";
import { useLinks } from "../hooks/useLinks";

export const UserPage = () => {
    const { id } = useParams();

    const { user, loading, error } = useUser(id);
    const { removeLink, handlePagination } = useLinks();

    const imagenSrc = user?.image
        ? `${import.meta.env.VITE_BACKEND}/images/${user.image}`
        : imageDefault;

    if (loading) return <p>Cargando datos de usuario ... </p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="profileContainer">
            <article className="profileCard">
                <Avatar
                    className="avatarProfile"
                    src={imagenSrc}
                    alt="avatar"
                    sx={{ width: 120, height: 120 }}
                />
                <div className="profileContent">
                    <h2 className="titleContent">{user.username}</h2>
                    <p className="emailContent">{user.email}</p>
                    <p className="descriptionContent">{user.description}</p>
                    <p className="registrationDate">
                        <span>Miembro desde</span>{" "}
                        {new Date(user.created_at).toLocaleDateString()}
                    </p>
                </div>
            </article>

            <section className="listProfile">
                <h2>Publicaciones</h2>
                <UserLinks
                    id={user.id}
                    removeLink={removeLink}
                    handlePagination={handlePagination}
                />
            </section>
        </div>
    );
};
