import { useContext, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { UpdatePasswordService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";

import '../styles/popUp.css'
import '../styles/updatePassword.css'


export const UpdatePasswordPage = () => {
    
    const {id } = useParams()

    const { token, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleForm = (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            setShowModal(false)
            return
        }
        setShowModal(true)
    };

    const handleLogout = async () => {
        try {
            await UpdatePasswordService({ token, password });

            logout()
            navigate('/login')

            
        } catch (error) {
            setError(error.message);
            
        } finally {
            setShowModal(false)
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <section className="updatePassword">
            <h2>Cambiar contraseña</h2>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="password">Nueva Contraseña</label>
                    <div className="passwordContainer">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="ShowPasswordButton"
                            onClick={toggleShowPassword}
                        >
                            <VisibilityIcon />
                        </button>
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="confirmPassword">
                        Confirmar contraseña
                    </label>
                    <div className="confirmPasswordContainer">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="ShowPasswordButton"
                            onClick={toggleShowConfirmPassword}
                        >
                            {" "}
                            <VisibilityIcon />
                        </button>
                    </div>
                </fieldset>

                <button className="btn">Cambiar contraseña</button>
                {error ? <p className="error">{error}</p> : null}
            </form>

            {showModal && (
                <div className="modalUpdate">
                    <div className="modalText">
                        <p>
                            {" "}
                            Al actualizar tu contraseña se procederá al cierre
                            de la sesión y se te redirigirá a la página de
                            Login.
                        </p>
                        <p>¿Desea Continuar?</p>
                        <div className="modalbuttons">
                            <button onClick={handleLogout}>Confirmar</button>
                            <button onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Link to={`/update/${id}`} className="btnUpdate">
            Volver a la página anterior
            </Link>
        </section>
    );
};
