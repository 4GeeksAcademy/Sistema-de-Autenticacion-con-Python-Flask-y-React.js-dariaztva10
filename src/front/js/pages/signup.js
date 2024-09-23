import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const Signup = () => {
    
    const{actions} = useContext(Context)

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    return(
        <div>
            <label>Email</label>
            <input 
            type="text"
            onChange={(e)=>setEmail(e.target.value)}
            />
                
           
            <label>Password</label>
            <input 
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            />
            
            <button
            onClick={()=>actions.signup(email, password)}
            >Sing Up</button>
        </div>

    )
}

export default Signup