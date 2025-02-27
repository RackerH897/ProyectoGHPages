import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Usuarios_admin from "./Usuarios_admin";
import Dashboard_admin from "./Dashboard_admin";
import Configuracion from "./Configuracion";
import Historial from "./Historial_Admin";
import { useNavigate} from "react-router-dom";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MainPage_admin=() => {
  let navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("dashboard"); 
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [actualizarnombre,setActualizarNombre] = useState<boolean>(false)



  useEffect(() => {
      const usuarioData = sessionStorage.getItem("Usuario");
  
      if (usuarioData) {
          const userData = JSON.parse(usuarioData);
          setNombreUsuario(userData.nombre); 
      }
  }, []);

  const ActualizarNombre =(()=>{
      setActualizarNombre(true)
  })

  useEffect(() => {
    const usuarioData = sessionStorage.getItem("Usuario");

    if (usuarioData) {
        const userData = JSON.parse(usuarioData);
        setNombreUsuario(userData.nombre); 
    }
    setActualizarNombre(false)
}, [actualizarnombre]);
  
  const Opciones = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard_admin/>;
      case "Usuarios":
        return <Usuarios_admin/>;
      case "historial":
        return <Historial/>;
      case "configuracion":
        return <Configuracion ActualizarNombre = {ActualizarNombre}/>;
      
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
            <h5>{nombreUsuario || "Administrador"}</h5>
        </div>
        <div className="row"></div>
        <div className="list-unstyled ps-0 ul">
          <li className="row col-12 row">
            <button
              className={`btn col-10 text-start mb-2 ms-4 ${
                activeSection === "dashboard" ? "btn-white text-primary bg-primary bg-opacity-25 " : ""
              }`}
              onClick={() => setActiveSection("dashboard")}
            > 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bar-chart-line col-4" viewBox="0 0 16 16">
                <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z"/>
              </svg>
              Dashboard
            </button>
          </li>
          <li className="row col-12">
            <button
              className={`btn col-10 text-start mb-2 ms-4 ${
                activeSection === "Usuarios" ? "btn-white text-primary bg-primary bg-opacity-25" : ""
              }`}
              onClick={() => setActiveSection("Usuarios")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people col-4" viewBox="0 0 16 16">
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
              </svg>
              Usuarios
            </button>
          </li>
          <li className="row col-12 ">
            <button
              className={`btn col-10 text-start mb-2 ms-4 ${
                activeSection === "historial" ? "btn-white text-primary bg-primary bg-opacity-25" : ""
              }`}
              onClick={() => setActiveSection("historial")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-stopwatch col-4" viewBox="0 0 16 16">
                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z"/>
                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3"/>
              </svg>
              Historial
            </button>
          </li>
          <li className="row col-12">
            <button
              className={`btn col-10 text-start mb-2 ms-4 ${
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
          <div className="row"></div>
          <li className="row col-12">
          <button
            className="btn w-100 text-start mt-4"
            onClick={() => {
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
        </div>
      </div>
      <div className="flex-grow-1 p-4 bg-light">
        {Opciones()}
      </div>
    </div>
  );
}

export default MainPage_admin;