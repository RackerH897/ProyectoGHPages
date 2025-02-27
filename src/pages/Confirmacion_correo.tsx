import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface LocationState {
    email: string;
    usuario: string;
    password: string;
}

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND || "http://localhost:3000"

const ConfirmacionCorreo = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const { email, usuario, password } = (location.state as LocationState) || {};

    const [codigo, setCodigo] = useState("");
    const [mensajeError, setMensajeError] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");


    const handleVerificarCodigo = async () => {
        try {
            const response = await fetch(URL_BACKEND + "/usuarios/verificar-codigo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ codigo }),
            });

            if (response.ok) {
                setMensajeExito("Código verificado correctamente.");
                setMensajeError("");

       
                const usuarioResponse = await fetch(URL_BACKEND + "/usuarios/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre: usuario, 
                        correo: email,
                        contraseña: password, 
                        rol: 1 // 🔹 
                    }),
                });

                if (usuarioResponse.ok) {
                    setMensajeExito("Usuario registrado con éxito.");
                    navigate("/"); 
                } else {
                    setMensajeError("Error al registrar el usuario.");
                }
            } else {
                setMensajeError("El código ingresado es incorrecto.");
                setMensajeExito("");
            }
        } catch (error) {
            console.error("❌ Error al verificar el código:", error);
            setMensajeError("Error en la conexión con el servidor.");
            setMensajeExito("");
        }
    };

    return (
        <div className="bg-body-secondary">
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col-12">
                        <div className="card p-4" style={{ maxWidth: "570px", width: "100%" }}>
                            <h3 className="text-left">Confirmación de Correo Electrónico</h3>
                            <p className="card-text text-left mt-4">
                                Se ha enviado un código de confirmación a tu correo electrónico: <strong>{email}</strong>.
                            </p>

                            {mensajeError && <p className="text-danger">{mensajeError}</p>}
                            {mensajeExito && <p className="text-success">{mensajeExito}</p>}

                            <div className="mb-3">
                                <label className="form-label">Ingrese el Código de Confirmación:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={codigo} 
                                    onChange={(e) => setCodigo(e.target.value)}
                                />
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <button onClick={handleVerificarCodigo} className="btn btn-primary w-100">
                                        Confirmar
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmacionCorreo;