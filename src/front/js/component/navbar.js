import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light">
			<div className="containerNav">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Volver al inicio</span>
				</Link>
				
			</div>
		</nav>
	);
};
