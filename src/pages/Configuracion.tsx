import { useEffect, useState } from "react"
import EditarInfoUsuario from "./EditarInfoUsuario"
import { Usuarios } from "./Tabla_usuarios_admin"
import { Rol } from "./Tabla_usuarios_admin"

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND || "http://localhost:3000"

const Configuracion = () =>{

    const rolvacio : Rol = {
        id : 0,
        nombre : ""
      }

    const Vacio : Usuarios = {
        id : 0,
        nombre : "-",
        contraseña : "-",
        correo : "-",
        rol : 0,
        Rol : rolvacio
    }
    const[usuarioLogin,setUsuarioLogin]=useState<Usuarios>(Vacio)
    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(()=>{
        const usuario = sessionStorage.getItem("Usuario");
        console.log("Usuario en sessionStorage:", usuario);
        if (usuario != null) {
            const userData = JSON.parse(usuario);
            console.log("Datos parseados:", userData);
            if(userData != null && userData.correo){
                httpObtenerUsuario(userData.correo)}
        }
    },[])

    

    const httpObtenerUsuario = async (correo:string) => {
        const url = URL_BACKEND + "/usuarios?correo="+correo
        const resp = await fetch(url)
        const data = await resp.json()
          if ( data.msg == "") {
            const Usuario = data.usuarios[0]
            if(Usuario!=null){
                setUsuarioLogin(Usuario)}
            
          }else {
              console.error(`Error al obtener usuario: ${data.msg}`)
          }
        }
    
    const httpEditarUsuario = async (id : number, nombreUsuario: string, correo: string, contraseña: string) => {
        const url = URL_BACKEND + "/usuarios?id="+id
        const resp = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                nombre: nombreUsuario,
                correo: correo,
                contraseña: contraseña
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await resp.json()
        const usuarioActual = JSON.parse(sessionStorage.getItem("Usuario") || "{}");
        usuarioActual.nombre = data.usuario.nombre
        usuarioActual.correo = data.usuario.correo
        usuarioActual.contraseña = data.usuario.contraseña
        sessionStorage.setItem("Usuario", JSON.stringify(usuarioActual));
        if (data.msg === "") {
            setShowModal(false)
        } else {
            console.error(`Error al editar usuario: ${data.msg}`)
        }
    }

    return (
        <div className="container mt-5 bg-light">
            <div className=" mb-3">
                <h2 className="fw-bold p-3">Mi perfil</h2>
            </div>
            <div className="row bg-white me-5">
                <div className="d-flex flex-row col-12 mb-3">
                    
                        <div className="col-5 p-4 ps-3">
                            <h4>Informacion Personal</h4>
                        </div>
                        <div className="p-4 col-7 text-end">
                            <button type="button" className="btn btn-primary col-4" onClick={()=>{
                                setShowModal(true)
                            }}>Editar</button>
                        </div>
                    
                </div>
            
                <div className="container row">
                    <div className="col-6">
                        <div className="col-1 p-3 pb-1">
                            Nombre
                        </div>
                        <div className="col-4 p-3">
                            {usuarioLogin.nombre}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="col-4 p-3 pb-1">
                            Correo electronico
                        </div>
                        <div className="col-3 p-3 pb-1">
                            {usuarioLogin.correo}
                        </div>
                    </div>
                </div>
                <div className="container mb-5">
                    <div className="col-1 p-3 pb-1">
                        Contraseña
                    </div>
                    <div className="col-3 p-3 pb-1">
                        {usuarioLogin.contraseña}
                    </div>
                </div>
            </div>
            <EditarInfoUsuario showModal={ showModal } 
            closeModal={ () => {
            setShowModal(false)
            } }
            Usuario={usuarioLogin}
            EditarUsuario={ async (id:number,nombreUsuario : string, correo : string, contraseña : string) => {
                await httpEditarUsuario(id, nombreUsuario, correo, contraseña)
                await httpObtenerUsuario(correo)}}/>
        </div>
        

    )
}

export default Configuracion