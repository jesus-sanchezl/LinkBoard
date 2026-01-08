import Popup from "reactjs-popup"
import PropTypes from 'prop-types'
import DeleteIcon from '@mui/icons-material/Delete'

import '../styles/popUp.css'

export const DeletePopUp = ({onConfirm, message}) => {

    return (
        <Popup
            trigger={
                <DeleteIcon className="deleteIcon"/>
            }
            modal
            closeOnDocumentClick
        >
            {(close) => (
                <div className="modal">
                    
                    <p>{message}</p>
                    <button onClick={() => {onConfirm(); close();}}>Eliminar</button>
                    <button onClick={close}>Cancelar</button>
                </div>
            )}

        </Popup>
    )
}

DeletePopUp.propTypes = {
    onConfirm: PropTypes.func,
    message: PropTypes.string
}