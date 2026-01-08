import { useContext } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { LinkList } from "../components/LinkList";
import { useLinks } from "../hooks/useLinks";
import { AuthContext } from "../context/AuthContext";
import { NewLink } from "../components/NewLink";

import "../styles/homePage.css";
import { Error } from "../components/Error";

export const HomePage = () => {
    const { links, loading, error, addLink, removeLink, handlePagination } =
        useLinks();

    const { user } = useContext(AuthContext);

    if (!user) {
        return (
            <Error message={"Es necesario estar registrado para acceder al contenido."} />
        );
    }

    if (loading) return <p>Cargando links ...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            {user ? (
                <div className="principal">
                    <NewLink addLink={addLink} />
                    <section className="list">
                        <h2>Publicaciones recientes</h2>
                        <LinkList
                            links={links}
                            removeLink={removeLink}
                            handlePagination={handlePagination}
                        />
                    </section>
                </div>
            ) : null}
        </>
    );
};
