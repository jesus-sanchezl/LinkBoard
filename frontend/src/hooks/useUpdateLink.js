import { useState, useEffect } from "react";
import { getSingleLinkService, UpdateLinkService } from "../services";
import { useNavigate } from "react-router-dom";

export const useUpdateLink = (id, token) => {
    const [updateUrl, setUpdateUrl] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateDescription, setUpdateDescription] = useState("");
    const [updateImage, setUpdateImage] = useState();
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSingleLinkService(id, token);
                setUpdateUrl(data.url);
                setUpdateTitle(data.titulo);
                setUpdateDescription(data.description);
                setUpdateImage(data.image);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [id, token]);

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target);
            await UpdateLinkService({ id, token, data });

            setError("")

            navigate('/')
        } catch (error) {
            setError("Por favor, completa todos los campos antes de guardar los cambios");
        }
    };

    return {
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
    };
};
