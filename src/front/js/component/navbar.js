import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const token = localStorage.getItem("jwt-token");
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	
	function Logout(e) {
		e.preventDefault();
		actions.logout();
		alert("Logout succesful");
		navigate("/");
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/">
						<button className={token? "btn btn-primary":"btn btn-primary d-none"} onClick={Logout} >Logout</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};