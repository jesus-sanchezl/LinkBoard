import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import { Button } from "@mui/material";

const BackButton = ({ displayBackButton }) => {
    const navigate = useNavigate();

    if (!displayBackButton) return null;

    return (
        <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{ backgroundColor: "black", color: "white" }}
        >
            Volver
        </Button>
    );
};

BackButton.propTypes = {
    displayBackButton: PropTypes.bool,
};

export default BackButton;
