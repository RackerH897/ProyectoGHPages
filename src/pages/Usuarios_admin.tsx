import TablaUsuario,{Usuarios, Rol} from "./Tabla_usuarios_admin"
import FiltrarRol from "./FiltrarRol"
import { useEffect, useState } from "react"
import RegistroUsuario from "./RegistroUsuario";

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND || "http://localhost:3000"

const UsuariosAdmin = () => {

  const [showModal, setShowModal] = useState<boolean>(false)
  const[showAgregar, setAgregar]=useState<boolean>(false)
  const [usuarios, setUsuarios] = useState<Usuarios[]>([])
  const [Roles,setRoles] = useState<Rol[]>([])
  const [filtroActivo, setFiltroActivo] = useState<boolean>(false)
  const [rolFiltrado, setRolFiltrado] = useState<number>(0);
  
  const httpObtenerUsuarios = async () => {
  if(filtroActivo) return;
  const url = URL_BACKEND + "/usuarios"
  const resp = await fetch(url)
  const data = await resp.json()
    if (data.msg == "") {
        const listaUsuarios = data.usuarios
        setUsuarios(listaUsuarios)
    }else {
        console.error(`Error al obtener usuarios: ${data.msg}`)
    }}
  

  const httpObtenerRol = async () => {
    const url = URL_BACKEND + "/rol"
    const resp = await fetch(url)
    const data = await resp.json()
    if (data.msg == "") {
        const listaRol = data.roles
        setRoles(listaRol)
    }else {
        console.error(`Error al obtener categorias: ${data.msg}`)
    }
}

const httpObtenerxFiltro = async (rol : number) => {
  const url = URL_BACKEND + "/usuarios?rol="+rol
  console.log(rol)
  const resp = await fetch(url)
  const data = await resp.json()
    if (data.msg == "") {
        const listaUsuarios = data.usuarios
        setUsuarios(listaUsuarios)
        console.log(listaUsuarios)
        setFiltroActivo(true)
        setRolFiltrado(rol)
        setShowModal(false)
    }else {
        console.error(`Error al obtener usuarios: ${data.msg}`)
    }
  }

  const httpAgregarUsuario = async (nombreUsuario : string, correo : string, contraseña : string, rol : number) => {
    const url = URL_BACKEND + "/usuarios"
    const resp = await fetch(url, {
        method : "POST",
        body : JSON.stringify({
            nombre : nombreUsuario,
            correo : correo,
            contraseña : contraseña,
            rol : rol
        }),
        headers : {
            "Content-Type": "application/json",
        }
    })
    const data = await resp.json()
    if (data.msg == "") {
      console.log(data.usuario)
      if (filtroActivo && rolFiltrado !== null) {
        await httpObtenerxFiltro(rolFiltrado);
      } else {
          await httpObtenerUsuarios();
      }
      closeModalAgregar()
    }
}


  useEffect( ()=> {
    
    httpObtenerUsuarios();

  },[!filtroActivo])

  useEffect(()=>{
    httpObtenerRol()
  },[])
  

const closeModalAgregar = () => {
  setAgregar(false)
} 

  ///const agregarElementoTabla = (elem : Usuarios) => {
  ///    tabla.push(elem)
  ///}
  
  return <>
        <TablaUsuario listaElementos={usuarios} FiltroActivo={filtroActivo} openModalAgregar={() => {setAgregar(true)}} openModal={() => {setShowModal(true)}} ObtenerUsuario={httpObtenerUsuarios} ObtenerxFiltro={httpObtenerxFiltro} rol={rolFiltrado}/>
        <RegistroUsuario showModal={ showAgregar } roles={Roles} closeModal={closeModalAgregar} GuardarUsuario={ async (nombreUsuario : string, correo : string, contraseña : string, rol : number) => {
                await httpAgregarUsuario(nombreUsuario, correo, contraseña, rol)
            }}/>
        <FiltrarRol showModal={showModal} Roles={Roles} closeModal={() => {setShowModal(false)}} FiltrarUsuario={ async (rol : number) => {
                await httpObtenerxFiltro(rol)}}/>
        
    </>
};

export default UsuariosAdmin;
