import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import '../styles/errorMessage.css'


export const ErrorMessage = ({message}) => {

    return (
        <div className="error-message-container">
            <p>{message}</p>
            <Link to="/">Volver a la página de inicio</Link>
        </div>
    );
};


ErrorMessage. propTypes = {
    message: PropTypes.string,
}