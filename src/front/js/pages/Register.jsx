import React, { useState, useContext } from "react"
import { Context } from "../store/appContext"

const initialStateUser = {
    name: "",
    last_name: "",
    email: "",
    password: "",
}

const Register = () => {
    const [user, setUser] = useState(initialStateUser)

    const { store, actions } = useContext(Context)

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que el formulario se recargue


        const response = await actions.signupUser(user);
        console.log(response)
        // if (!response.error) {
        //     // Redirigir al usuario a la página de inicio o login
        //     navigate("/loginuser"); // Por ejemplo, redirigir a la página de login
        // } else {
        //     setError(response.msg); // Mostrar el mensaje de error si ocurre
        // }

    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-7">
                    <form onSubmit={handleSubmit} className="border">
                        <div className="form-group">
                            <label htmlFor="">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Jhon Doe"
                                value={user.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Apellido</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                placeholder="Apellido"
                                value={user.last_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Correo</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                placeholder="Jhon@gmail.com"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Contraseña</label>
                            <input
                                type="text"
                                className="form-control"
                                name="password"
                                placeholder="Jhon Doe"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button className="btn btn-primary w-100">Regístrarse</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register