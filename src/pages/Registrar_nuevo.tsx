import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND || "http://localhost:3000"

const Registrar_nuevo = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<string>("");
    const [correo, setCorreo] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");


    const manejarEnvio = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
    
            const codigoGenerado = Math.floor(1000 + Math.random() * 9000).toString();
            console.log("🔹 Código generado:", codigoGenerado); 

            
            const response = await fetch(URL_BACKEND + "/usuarios/ingresar-codigo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ codigo: codigoGenerado }),
            });

            if (!response.ok) {
                setError("Error al generar el código.");
                return;
            }

            console.log("✅ Código guardado en la base de datos correctamente.");

          
            const serviceId = "service_4seg2xc";
            const templateId = "template_cvsodxv";
            const publicKey = "n11zEkWt0Rdwktq5K";

            const templateParams = {
                email: correo, 
                message: codigoGenerado, 
            };

            // Enviar el código por correo
            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            console.log("✅ Correo enviado exitosamente.");

            // Redirigir a la confirmación de correo
            navigate("/confirmacion-correo", { 
                state: { email: correo, usuario, password } 
            });

        } catch (error) {
            console.error("❌ Error al enviar el código:", error);
            setError("Error en la conexión con el servidor.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-body-secondary" style={{ height: "100vh" }}>
            <div className="p-4 rounded bg-white" style={{ width: "100%", maxWidth: "400px" }}>
                <h1 className="text-center mb-4">Registro nuevo</h1>
                <form onSubmit={manejarEnvio}>
                    <div className="row mb-3">
                        <div className="col-12">
                            <input
                                className="form-control"
                                placeholder="Nombre de usuario:"
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
                                type="email"
                                placeholder="Correo:"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <input    
                                className="form-control"
                                type="password"
                                placeholder="Contraseña:"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <input    
                                className="form-control"
                                type="password"
                                placeholder="Confirmar contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {error && <p style={{ color: 'red' }}>ERROR: {error}</p>}

                    <div className="row mb-2">
                        <div className="col-12">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="submit">
                                    Registrar
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registrar_nuevo;