import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    
    const{actions} = useContext(Context)
    const navigate = useNavigate()
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const handleLogin = async () => {
        // Llamo a la función de login y espera su resultado
        const success = await actions.login(email, password);
        // Si el login es exitoso, redirige a la página privada
        if (success) {
            navigate("/private");
        } else {
            alert("Error en el inicio de sesión");
        }
    }

    return(
        <div>
            <label  className="col-12 text-center">Email</label>
            <input className="col-12"
            type="text"
            onChange={(e)=>setEmail(e.target.value)}
            />
                
           
            <label  className="col-12 text-center">Password</label>
            <input  className="col-12"
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            />
            <div className="d-grid gap-2 col-6 mx-auto">
                <button
            
                onClick={handleLogin}
                >   Log in</button>
            </div>
            
        </div>

    )
}

export default Login