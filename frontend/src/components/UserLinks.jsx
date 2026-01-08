import PropTypes from "prop-types";
import { useLinks } from "../hooks/useLinks";
import { ErrorMessage } from "./ErrorMessage";
import { LinkList } from "./LinkList";

export const UserLinks = ({ id }) => {
    const { links, loading, error, removeLink, handlePagination } =
        useLinks(id);

    if (loading) return <p>Cargando links de usuario ...</p>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <LinkList
            links={links}
            removeLink={removeLink}
            handlePagination={handlePagination}
        />
    );
};

UserLinks.propTypes = {
    id: PropTypes.string,
};
