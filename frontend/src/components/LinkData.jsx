import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import { AuthContext } from "../context/AuthContext";
import { Vote } from "./Vote";
import { deleteLinkService } from "../services";
import BackButton from "./BackButton";
import {DeletePopUp} from "../components/DeletePopUp";

import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import imageDefault from '../../public/imageDefault.png'


import "../styles/linklist.css";

export const LinkData = ({ link, removeLink, displayBackButton = true }) => {
    const [error, setError] = useState("");

    const { user, token } = useContext(AuthContext);

    const navigate = useNavigate();

    const deleteLink = async (id) => {
        try {
            await deleteLinkService({ id, token });

            if (removeLink) {
                removeLink(id);
            } else {
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleConfirmDelete = () => {
        deleteLink(link.id);
    };

    const imgSrc = link.image
        ? `${import.meta.env.VITE_BACKEND}/images/${link.image}`
        : imageDefault;

    return (
        <article className="linkData">
            <Link to={`/link/${link.id}`} className="articleLink">
            <Box className="titleImage">
                <Typography>
                    <div className="linkTitle">

                        {link.titulo}
                    </div>
                    
                </Typography>
                <img src={imgSrc} alt={link.titulo} />
            </Box>

            </Link>
            <Box className="rest">
                <p className="url" >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.url}
                    </a>
                </p>
                <p className="descripcion">{link.description}</p>
                <p className="create">
                    <Link className="owner" to={`/user/${link.user_id}`}>
                        {link.username}
                    </Link>{" "}
                    On {new Date(link.created_at).toUTCString()}
                </p>

                <Box>
                    <Vote
                        linkId={link.id}
                        initialValue={parseInt(link.media)}
                        creatorId={link.user_id}
                    />
                </Box>

                {user && user.id === link.user_id ? (
                    <section className="icons">
                        <Link to={`/link/edit/${link.id}`} className="iconLink">
                            <EditIcon className="editIcon" />
                        </Link>

                        <DeletePopUp
                            className="deleteIcon"
                            onConfirm={handleConfirmDelete}
                            message="¿Estas seguro de que quieres borrar este link?"
                        />

                        {error && <p className="errorMessage">{error}</p>}
                    </section>
                ) : null}
                <div>
                    <BackButton displayBackButton={displayBackButton} />
                </div>
            </Box>
        </article>
        
    );
};

LinkData.propTypes = {
    link: PropTypes.object,
    removeLink: PropTypes.func,
    displayBackButton: PropTypes.bool,
};
