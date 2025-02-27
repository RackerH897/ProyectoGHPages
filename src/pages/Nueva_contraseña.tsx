import { useNavigate } from "react-router-dom";
import { useState } from "react";

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND || "http://localhost:3000"

const Nueva_contraseña = () => {
    const navigate = useNavigate();

    const [correo, setCorreo] = useState<string>("");
    const [contraseña, setContraseña] = useState<string>("");
    const [copContraseña, setCopContraseña] = useState<string>("");
    const [token, setToken] = useState<string>("");

    const solicitarToken = async (correo : string) => {
      const response = await fetch(URL_BACKEND+"/ResetPassword/solicitar", {
          method: "POST",
          body : JSON.stringify({
            correo : correo,
        }),
          headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      if (data.msg == "") {
          setToken(data.token)
      }
  };

  const cambiarContraseña = async (token : string, nuevaContraseña : string) => {
      if (contraseña !== copContraseña) {
          alert("Las contraseñas no coinciden.");
      }

      const resp = await fetch(URL_BACKEND+"/ResetPassword/cambiar", {
          method: "PUT",
          body: JSON.stringify({ token : token, contraseña: nuevaContraseña }),
          headers: { "Content-Type": "application/json" },
          
      });

      const data = await resp.json();
      if (data.msg == "") {
          navigate("/");
      }
  };

    const correoChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
      setCorreo(e.target.value)
  }

  const contraseñaChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    setContraseña(e.target.value)
  }
  const copContraseñaChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    setCopContraseña(e.target.value)
  }

    return (<div className="bg-light d-flex justify-content-center align-items-center vh-100">
        <div className="container bg-white text-center w-25">
          <form id ="correoingreso">
          <div className="h5 m-4">Ingresar Correo</div>
                <div className="m-4">
                  <div className="mb-2">
                      <input type="text" 
                              className="form-control" 
                              id="correo" 
                              placeholder="Ingrese su correo" 
                              value={correo} 
                              onChange={correoChangeHandler}
                              required />
                    </div>
                  <div className="mt-4 mb-3 m-4">
                    <button onClick={()=>{solicitarToken(correo)}} type="button" className="btn btn-primary w-100">Verificar correo</button>
                  </div>
                </div>
                </form>
            <form id="passwordForm">
              <div className="h2 m-5 mt-2">Nueva contraseña</div>
              <div className="m-4">
                <div className="mb-2">
                    <input type="password" className="form-control" id="newPassword" placeholder="Nueva contraseña" value={contraseña} onChange={contraseñaChangeHandler} disabled={!token} required />
                  </div>
                  <div>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Re-escribir nueva contraseña" value={copContraseña} onChange={copContraseñaChangeHandler} disabled={!token} required />
                  </div>
              </div>
              <div className="mt-5 mb-5 m-4">
                <button onClick={()=>{cambiarContraseña(token, contraseña)}} type="button" className="btn btn-primary w-100" disabled={!token}>Aceptar</button>
              </div>
            </form>
        </div>
    </div>)
}


export default Nueva_contraseña