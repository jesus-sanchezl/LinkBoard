import { useParams } from "react-router-dom";

import { useLink } from "../hooks/useLink";
import { ErrorMessage } from "../components/ErrorMessage";
import { LinkData } from "../components/LinkData";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Comments } from "../components/Comments";
import { useComments } from "../hooks/useComments";

export const LinkPage = () => {
    const { id } = useParams();

    const { user } = useContext(AuthContext);

    const { link, loading, error } = useLink(id);

    
    const {  addComment, removeComments } = useComments(id);

    if (loading) return <p>Cargando Link ... </p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            {user ? (
                <section>
                    <LinkData link={link} />
                    <Comments
                        linkId={id}
                        addComment={addComment}
                        removeComment={removeComments}
                    />
                </section>
            ) : null}
        </>
    );
};
