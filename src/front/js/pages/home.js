import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [page, setPage] = useState("Login");
	const [message, setMessage] = useState("To login write a valid email and password...");
	const navigate = useNavigate();

	useEffect(()=>{
		const token = localStorage.getItem("jwt-token");
		if (token){
			alert("Estás logeado");
			navigate("/private");
		}
	}, []);

	function setParams() {
		if (page=="Signup"){
			setPage("Login");
			setMessage("To login write a valid email and password...")
		} else{
			setPage("Signup");
			setMessage("To signup write a valid email and password...");
		}
	};

	async function handleSubmit(e) {
		e.preventDefault();
		e.persist();
		const email = e.target.InputEmail.value;
		const pass = e.target.InputPassword.value;
		let resp = await actions.apiFetch(email, pass, page);
		alert(resp.data.message);
		if (resp.code == 200){
			if (page == "Login"){
				navigate("/private");
			} else {
				setParams();
			}
		} else if (page=="Signup") {
			setParams();
		}
		e.target.reset();
	}

	return (
			<div className="container text-center mt-4">
				<div className="row justify-content-center">
					<div className="col-md-7 col-lg-5 flex">
						<div className="wrap rounded-top" style={{background:"#f8f9fd", boxShadow:"0px 10px 34px -15px rgba(0, 0, 0, 0.24)"}}>
							<div>
								<img className="rounded-top w-100" src="https://picsum.photos/id/289/400/200"></img>
							</div>
							<div className="login-wrap p-3 p-md-5">
								<div className="w-100">
									<h3 className="mb-4 text-success fw-bold">{page}</h3>
								</div>
								<form onSubmit={handleSubmit} className="signin-form">
									<div className="form-group my-3">
										<input type="email" className="form-control" name="InputEmail" placeholder="Email" required/>
									</div>
									<div className="form-group mb-3">
										<input type="password" className="form-control" name="InputPassword" placeholder="Password" required/>
									</div>
									<div className="form-group">
										<button type="submit" className="form-control btn btn-primary rounded submit px-3">{page}</button>
									</div>
								</form>
								<p className="text-center mt-3 text-success fw-bold">{page=="Signup"? "Already a member? ":"Not a member? "}<a data-toggle="tab" href="#" onClick={setParams} className="active">{page=="Signup"? " Login":" Sign Up"}</a></p>
							</div>
						</div>
						<div className="alert alert-info mt-3">
							{message}
						</div>
					</div>
				</div>
			</div>
	);
};