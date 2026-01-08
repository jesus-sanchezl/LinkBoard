import PropTypes from "prop-types";
import { LinkData } from "./LinkData";
import { Button } from "@mui/material";

import "../styles/linklist.css";

export const LinkList = ({ links, removeLink, handlePagination }) => {
    return links.length ? (
        <div className="listBtn">
            <ul>
                {links.map((link) => (
                    <li key={link.id} className="list">
                        {" "}
                        <LinkData
                            link={link}
                            removeLink={removeLink}
                            displayBackButton={false}
                        />
                    </li>
                ))}
            </ul>
            <Button
                variant="contained"
                className="btnMore"
                color="button"
                onClick={handlePagination}
            >
                Ver más
            </Button>
        </div>
    ) : (
        <p>No hay publicaciones que mostrar</p>
    );
};

LinkList.propTypes = {
    links: PropTypes.array,
    removeLink: PropTypes.func,
    handlePagination: PropTypes.func,
};
