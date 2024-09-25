import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        const success = await actions.signup(email, password);
        if (success) {
            navigate("/login");
        } else {
            alert("Error en el registro");
        }
    };

    return (
        <div>
            <label className="col-12 text-center">Email</label>
            <input className="col-12"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
            />

            <label className="col-12 text-center">Password</label>
            <input className="col-12"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <div className="d-grid gap-2 col-6 mx-auto">
                <button onClick={handleSignup}>
                    Signup
                </button>
            </div>
            
            
            <div className="text-center mt-3">
                <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
            </div>
        </div>
    );
};

export default Signup;
