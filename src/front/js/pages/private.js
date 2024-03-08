import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

	useEffect(()=>{
        const token = localStorage.getItem("jwt-token");
		if (token) actions.getUserInfo();
		else navigate("/");
	}, []);

	return (
		<div className="container text-center mt-4">
			<div className="row justify-content-center">
				<div className="col-md-7 col-lg-5 flex">
					<div className="wrap rounded-top" style={{background:"#f8f9fd", boxShadow:"0px 10px 34px -15px rgba(0, 0, 0, 0.24)"}}>
						<div>
							<img className="rounded-top w-100" src="https://picsum.photos/id/13/400/200"></img>
						</div>
						<div className="login-wrap p-3 p-md-5">
							<div className="w-100">
								<h3 className="mb-4 text-success fw-bold">Your Private Page</h3>
							</div>
							<div className="my-3">
								<input type="text" value={"User id: " + store.userInfo.userId} disabled/>
							</div>
                            <div className="my-3">
								<input type="text" value={"User email: " + store.userInfo.email} disabled/>
							</div>
                            <div className="my-3">
								<input type="text" value={"Is active? " + store.userInfo.isActive} disabled/>
							</div>
						</div>
					</div>
					<div className="alert alert-info mt-3">Welcome {store.userInfo.email}</div>
				</div>
			</div>
		</div>
	);
};