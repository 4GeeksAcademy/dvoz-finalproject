import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context)

	const { token } = store

	return (


		// <nav className="navbar" style={{ backgroundColor: "#4b3331" }}>
		// 	<Link to="/">
		// 		<div className="navbar-brand mb-0">
		// 			<h2
		// 				style={{
		// 					color: "white",
		// 					fontWeight: "bold",
		// 					fontFamily: "Arial, sans-serif",
		// 				}}
		// 			>
		// 				Tripeate
		// 			</h2>
		// 		</div>
		// 	</Link>
		// 	<div className="ml-auto">
		// 		{store.token ? ( // Si hay token, mostrar "Cerrar Sesión"
		// 			<button
		// 				className="btn btn-outline-danger ml-2"
		// 				onClick={handleLogOut}
		// 			>
		// 				Cerrar Sesión
		// 			</button>
		// 		) : ( // Si no hay token, mostrar "Iniciar Sesión"
		// 			<Link to="/loginuser">
		// 				<button className="btn btn-light" style={{ fontWeight: "bold" }}>
		// 					Iniciar Sesión
		// 				</button>
		// 			</Link>
		// 		)}
		// 	</div>
		// </nav>
		<nav className="navbar navbar-expand-lg bg-body-tertiary navbar-main">
			<div className="container">
				<a className="navbar-brand" href="#">Tripeate</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
					<ul className="navbar-nav">
						{
							token == null ?
								<li className="nav-item">
									<Link className="btn btn-light" aria-current="page" to="/login">Iniciar Sesión</Link>
								</li> :
								<li className="nav-item">
									<button
										className="btn btn-light"
										aria-current="page" to="/#"
										onClick={() => actions.logout()}
									>Salir</button>
								</li>
						}

					</ul>
				</div>
			</div>
		</nav>
	);
};
