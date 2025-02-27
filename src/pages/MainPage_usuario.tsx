import { useEffect, useState } from "react";
import Dashboard from "./Dashboard_user";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import PaginaEgresos from "./PaginaEgresos";
import Configuracion from "./Configuracion";
import Presupuesto from "./Presupuesto";
import { useNavigate} from "react-router-dom";

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND || "http://localhost:3000"

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MainPage_usuario=() => {
  let navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("dashboard"); // Estado para controlar la sección activa
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [UsuarioId, setUsuarioId] = useState<number>(0)
  const [actualizarnombre,setActualizarNombre] = useState<boolean>(false)

  useEffect(() => {
      const usuarioData = sessionStorage.getItem("Usuario");
  
      if (usuarioData) {
          const userData = JSON.parse(usuarioData);
          setUsuarioId(userData.id)
          setNombreUsuario(userData.nombre); 
      }
  }, []);

  const ActualizarNombre =(()=>{
    setActualizarNombre(true)
})

const httpLogOut = async (id:number) => {

    const url = URL_BACKEND + "/access-logs/logOut" 
    const resp = await fetch(url , {
      method: "POST",
      body: JSON.stringify({
        id : id
      }),
      headers : {
        "Content-Type": "application/json",
      }
    })
    const data = await resp.json()
        if (data.msg == "") {
            console.log("LogOut registrado")
        }
  
}

useEffect(() => {
  const usuarioData = sessionStorage.getItem("Usuario");

  if (usuarioData) {
      const userData = JSON.parse(usuarioData);
      setNombreUsuario(userData.nombre); 
  }
  setActualizarNombre(false)
}, [actualizarnombre]);

  // Contenido dinámico que se mostrará en el main content
  const Opciones = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard/>;
      case "gastos":
        return <PaginaEgresos UsuarioId={UsuarioId}/>;
      case "presupuestos":
        return <Presupuesto/>;
      case "configuracion":
        return <Configuracion ActualizarNombre = {ActualizarNombre} />;
      
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="bg-light border-end" style={{ width: "250px" }}>
        <div className="text-center p-4" >
          <img
            src="https://www.usmagazine.com/wp-content/uploads/2019/10/Will-Smith-Fresh-Prince-Bel-Air-Promo.jpg?quality=78&strip=all" className="rounded-circle usuario-foto" alt="foto-del-usuario"
            style={{ width: "125px", height: "125px" }}/>
            <h5>{nombreUsuario || "Usuario"}</h5> 
        </div>
        <ul className="list-unstyled ps-0">
          <li>
            <button
              className={`btn w-100 text-start ${
                activeSection === "dashboard" ? "btn-white text-primary bg-primary bg-opacity-25" : ""
              }`}
              onClick={() => setActiveSection("dashboard")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bar-chart-line col-4" viewBox="0 0 16 16">
                <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z"/>
              </svg>
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`btn w-100 text-start ${
                activeSection === "gastos" ? "btn-white text-primary bg-primary bg-opacity-25" : ""
              }`}
              onClick={() => setActiveSection("gastos")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cash col-4" viewBox="0 0 16 16">
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
              </svg>
              Gastos
            </button>
          </li>
          <li>
            <button
              className={`btn w-100 text-start ${
                activeSection === "presupuestos" ? "btn-white text-primary bg-primary bg-opacity-25" : ""
              }`}
              onClick={() => setActiveSection("presupuestos")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-coin col-4" viewBox="0 0 16 16">
                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
              </svg>
              Presupuestos
            </button>
          </li>
          <li>
            <button
              className={`btn w-100 text-start ${
                activeSection === "configuracion" ? "btn-white text-primary bg-primary bg-opacity-25" : ""
              }`}
              onClick={() => setActiveSection("configuracion")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear col-4" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
              </svg>
              Configuración
            </button>
          </li>
          <li>
            <button
              className="btn w-100 text-start mt-4"
              onClick={() => {
                httpLogOut(UsuarioId)
                sessionStorage.removeItem("Usuario"); 
                navigate("/"); 
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-right col-4" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
              </svg>
              Salir
           </button>
          </li>
        </ul>
      </div>
      <div className="flex-grow-1 p-4 bg-light">
        {Opciones()}
      </div>
    </div>
  );
}

export default MainPage_usuario;