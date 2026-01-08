import { useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";

import { Box, Rating, Snackbar, Alert } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { addVoteService, checkVotedService } from "../services";

export const Vote = ({ linkId, initialValue, creatorId }) => {
    const { token, user } = useContext(AuthContext);

    const [value, setValue] = useState(initialValue);
    const [canVote, setCanVote] = useState(true);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);



    useEffect(()=> {
        const checkIfUserVoted = async () => {
            try {

                if (creatorId === user?.id) {
                    setCanVote(false); 
                    return
                }
                const result = await checkVotedService(linkId, token)
                setCanVote(!result)
                
            } catch (error) {
                console.error("Error verificando voto:", error.message);
            }

        }

        checkIfUserVoted()

    }, [linkId, token, creatorId, user])


    const handleRatingChange = async (event, newValue) => {
        setValue(newValue);
    
        try {
            const result = await checkVotedService(linkId, token);
    
            if (result) {
                setCanVote(false); 
                setOpen(true);
                setError("Ya has votado esta publicación");
                return; 
            }
    
            
            await addVoteService(linkId, token, newValue);
            setOpen(true);
            setCanVote(false); 
            setError(""); 
        } catch (error) {
            setError(error.message); 
            setOpen(true); 
        }
    };
    

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <>
        <Box>
            <Rating
                name={`rating-${linkId}`}
                value={value}
                onChange={handleRatingChange}
                disabled={!canVote}
            
            />
        </Box>

        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={error ? "warning" : "success"}
                sx={{ width: "100%" }}
            >
                {error || "Voto realizado con éxito"}
            </Alert>
        </Snackbar>
    </>
    );
};

Vote.propTypes = {
    linkId: PropTypes.number,
    initialValue: PropTypes.number,
    creatorId: PropTypes.number,
};
