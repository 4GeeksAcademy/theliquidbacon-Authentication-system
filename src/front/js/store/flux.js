const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userInfo: [],
			demo: []
		},
		actions: {
			apiFetch: async(email, pass, page) => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/"+ page, {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({email: email, password: pass})
					});
					const data = await resp.json();
					if (page=="Login" && resp.status==200) localStorage.setItem("jwt-token", data.token);
					return {code: resp.status, data};
				}catch(error){
					console.log("Error in login", error)
				}
			},
			getUserInfo: async() => {
				try{
					const token = localStorage.getItem('jwt-token');
					if (token){
						const resp = await fetch(process.env.BACKEND_URL + "/api/protected", {
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								"Authorization": 'Bearer '+ token
							}
						});
						if(!resp.ok) throw Error("There was a problem in the login request");
						if(resp.status === 403){
							throw ("Missing or invalid token");
						}
						const data = await resp.json();
						setStore({ userInfo: data })
					} else {
						return ({"message": "No token"})
					}
				}catch(error){
					console.log("Error loading data", error)
				}
			},
			logout: () =>{
				localStorage.removeItem("jwt-token");
				setStore({ userInfo: []});
			}
		}
	};
};

export default getState;