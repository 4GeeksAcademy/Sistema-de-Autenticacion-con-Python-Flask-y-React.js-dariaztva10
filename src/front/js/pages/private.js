import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

const Private = () => {
    const navigate = useNavigate();
    const { actions, store } = useContext(Context);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        actions.logout();
        navigate('/');
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/');
        } else {
            const fetchPosts = async () => {
                const autentication = await actions.getMyPosts(); // Espera a que se completen los posts
               
                console.log(autentication)
                if (autentication){
                    setLoading(false); 
                } else {
                    navigate('/')
                }
            };
            fetchPosts();
        }
    }, []);
    
    // Si estás cargando las publicaciones, puedes mostrar un loading
    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div className="vip-container">
                <h2>Esta es la página privada</h2>
                <h3>Mis Publicaciones:</h3>
                <ul>
                    {store.myPosts && store.myPosts.length > 0 ? (
                        store.myPosts.map((post, index) => (
                            <li key={index}>{post.title}</li> 
                        ))
                    ) : (
                        <li>No hay publicaciones disponibles.</li>
                    )}
                </ul>
            </div>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
    
};

export default Private;
