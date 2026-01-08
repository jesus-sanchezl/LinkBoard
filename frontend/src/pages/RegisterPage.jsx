import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUserService } from "../services";

import '../styles/auth.css'

export const RegisterPage = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState('')


    const handleForm = async (e) => {
        e.preventDefault();
        setError('')

        

        if (password.length < 4) {
            setError("La contraseña debe tener al menos 4 caracteres.");
            return;
        }

        if (password !== repeatPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        try {
            await registerUserService({username, email, password, repeatPassword})

            navigate('/login')
            
        } catch (error) {
            setError(error.message)
        }

    }

    

    return (
        <section className="center">
            <h1>Registro</h1>
            <form onSubmit={handleForm}>
                <div className="inputbox">
                    <label htmlFor="username">Nombre de usuario</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="inputbox">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="inputbox">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="inputbox">
                    <label htmlFor="repeatPassword">Repita contraseña</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        name="repeatPassword"
                        required
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </div>

            
                    <button className="btn">Crear Cuenta</button>
        

                <div className="text">
                    <Link to={"/login"}> Iniciar sesión </Link>
                </div>

                {error ? <p className="error">{error}</p> : null}
            </form>
        </section>
    );
};
