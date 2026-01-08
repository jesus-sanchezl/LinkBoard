import { useComments } from "../hooks/useComments";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { DeletePopUp } from "./DeletePopUp";

import '../styles/comments.css'

export const Comments = ({ linkId }) => {
    const {
        comments,
        loading,
        error,
        newCommentText,
        setNewCommentText,
        deleteComment,
        handleComment,
    } = useComments(linkId);

    return (
        <div className="comments">
            <h2 className="title">Comentarios</h2>
            <form className="form" onSubmit={handleComment}>
                <input
                    className="input"
                    type="text"
                    placeholder="Escribe aquí tu comentario"
                    maxLength={500}
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                />
                <button className="submit-btn">Enviar comentario</button>
                {loading && <p className="loading">Cargando comentario</p>}
                {error && <p className="error">{error}</p>}
            </form>

            {comments.length > 0 ? (
                <ul className="list">
                    {comments.map((comment, index) => (
                        <li className="item" key={index}>
                            <p className="text">{comment.comment_text}</p>
                            <div className="icon">
                                {comment.user_id === comment.user_id && (
                                    <DeletePopUp
                                        onConfirm={() =>
                                            deleteComment(comment.id)
                                        }
                                        message="¿Estás seguro de borrar este comentario?"
                                    />
                                )}
                            </div>
                            <p className="text">
                                <Link
                                    className="owner"
                                    to={`/user/${comment.user_id}`}
                                >
                                    {comment.username}
                                </Link>{" "}
                                On {new Date(comment.created_at).toUTCString()}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-comments">
                    No existen comentarios para este link ...{" "}
                </p>
            )}
        </div>
    );
};

Comments.propTypes = {
    linkId: PropTypes.string,
    comments: PropTypes.array,
    
};
