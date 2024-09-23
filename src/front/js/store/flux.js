const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction

			


			signup:(email, password) => {
				fetch(process.env.BACKEND_URL + "api/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password,
						is_active: true
					})
				})
				.then((response)=>response.json())
				.then(data=>console.log(data))
				.catch(error=>console.log(error))
			},

			login:(email, password) => {
				fetch(process.env.BACKEND_URL + "api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
				.then((response)=>response.json())
				.then(data=>localStorage.setItem("token", data.token))
				.catch(error=>console.log(error))
			},

			getMyPosts: async () => {
				const token = localStorage.getItem('token');
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/my_posts", {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						}
					});
					if (!response.ok) {
						throw new Error(`Error: ${response.status}`);
					}
					const data = await response.json();
					setStore({ myPosts: data.posts }); // Almacena los posts en el store
					console.log("Posts:", data.posts);
					return data.posts;
				} catch (error) {
					console.error("Error fetching posts:", error);
				}
			},


			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
