import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserService } from "../services";
import { AuthContext } from "../context/AuthContext";

import '../styles/auth.css'

export const LoginPage = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')
    

    const { login } = useContext(AuthContext)


    const handleForm = async (e) => {
        e.preventDefault();

        try {
            setError('')
            
            if (password.length < 4) {
                setError("La contraseña debe tener al menos 4 caracteres.");
                return;
            }

            const token = await loginUserService({email, password})

            

            login(token)

            navigate('/')

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <section className="center">
            <h1>Inicia Sesión</h1>
            <form onSubmit={handleForm} >
                <div className="inputbox" >
                    <label  htmlFor="email">Email</label>
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

            
                    <button className="btn">Iniciar sesion</button>
                

                <div className="text">
                    <Link to={"/register"}>Crear cuenta</Link>
                </div>

                {error ? <p className="error">{error}</p> : null}
            </form>
        </section>
    );
};
