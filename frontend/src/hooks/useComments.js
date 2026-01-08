import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
    createCommentService,
    deleteCommentService,
    getCommentsByLinkIdService,
} from "../services";


export const useComments = (linkId) => {


    const { token } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [newCommentText, setNewCommentText] = useState("");

    const loadComments = async () => {
        try {
            setLoading(true);
            const data = await getCommentsByLinkIdService(linkId, token);

            await setComments(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadComments();
    }, [linkId, token]);

    const addComment = (data) => {
        setComments((commnets) => [data, ...commnets]);
        loadComments();
    };

    const removeCommet = (id) => {
        setComments((comments) => comments.filter((comment) => comment.id !== id));
        loadComments();
    };

    const deleteComment = async (id) => {
        try {
            await deleteCommentService({ id, token })

            removeCommet(id);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!newCommentText.trim()) {
            setError('Tu comentario no puede estar vacío. ¡Anímate a decir algo!')
            return
        }
        try {
            setLoading(true)
            const newComment = await createCommentService(
                linkId,
                newCommentText,
                token
            );
            addComment(newComment)
            setNewCommentText('')
            setError('')
            
        } catch (error) {
            setError(error.message);
        }
    };

    return {
        comments,
        loading,
        error,
        newCommentText,
        setNewCommentText,
        addComment,
        removeCommet,
        deleteComment,
        handleComment,
    };
};
