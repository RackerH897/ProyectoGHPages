import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND || "http://localhost:3000"

const LoginPage = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
   
    useEffect(() => {
        const usuarioData = sessionStorage.getItem("Usuario");

        if (usuarioData) {
            const userData = JSON.parse(usuarioData);
            if (userData.rol === 1) {
                navigate("/MainPage_usuario");
            } else if (userData.rol === 2) {
                navigate("/MainPage_admin");
            }
        }
    }, [navigate]); 

    
    const loginHandler = async (correo: string, contraseña: string) => {
        console.log("Intentando iniciar sesión...");
        const userData = { correo, contraseña };

        try {
            const resp = await fetch(URL_BACKEND + "/usuarios/login", {
                method: "POST",
                body: JSON.stringify(userData),
                headers: { "Content-Type": "application/json" },
            });

            const data = await resp.json();
            console.log("Respuesta del servidor:", data);

            if (resp.ok) { 
                sessionStorage.setItem("Usuario", JSON.stringify(data));
                console.log("✅ Datos guardados en sessionStorage:", sessionStorage.getItem("Usuario"));
                
                if (data.rol === 1) {
                    console.log("🔹 Redirigiendo a MainPage_usuario");
                    navigate("/MainPage_usuario");
                } else if (data.rol === 2) {
                    console.log("🔹 Redirigiendo a MainPage_admin");
                    navigate("/MainPage_admin");
                } else {
                    console.error("⚠ Rol no reconocido:", data.rol);
                    setError("Rol no reconocido.");
                }
            } else {
                console.log("❌ Error de autenticación:", data.msg);
                setError("Correo o contraseña incorrectos.");
            }
        } catch (error) {
            console.error("❌ Error en la solicitud:", error);
            setError("Error en la conexión con el servidor.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-body-secondary" style={{ height: "100vh" }}>
            <div className="p-4 rounded bg-white" style={{ width: "100%", maxWidth: "400px" }}>
                <h1 className="text-center mb-4">Log In</h1>
                
                <form onSubmit={(e) => {
                    e.preventDefault();
                    loginHandler(usuario, password);
                }}>
                    <div className="row mb-3">
                        <div className="col-12">
                            <input
                                className="form-control"
                                type="email"
                                placeholder="Ingresar correo"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <input    
                                className="form-control"
                                type="password"
                                placeholder="Ingresar contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-danger text-center">{error}</p>}

                    <div className="row mb-3">
                        <div className="col-12 text-center">
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/nueva-contraseña"); }} className="text-decoration-underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-12">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="submit">
                                    Ingresar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-12 text-center">
                            <span className="text-muted">O</span>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-12">
                            <div className="d-grid gap-2">
                                <button className="btn btn-secondary" onClick={() => navigate("/registrar-nuevo")} type="button">
                                    Registrarse
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;