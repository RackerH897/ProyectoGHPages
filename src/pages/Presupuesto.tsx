import AgregarPresupuesto from "./AgregarPresupuesto"
import { useEffect, useState } from "react"
import EditarPresupuesto from "./EditarPresupuesto"
import BorrarPresupuesto from "./Borrarpresupuesto"
import { Categoria } from "./EditarPresupuesto"


interface Presupuesto{
  id : number;
  UsuarioId : number,
  monto_Mensual : number
  categoriaId : number;
  Categoria : Categoria
  
}

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND || "http://localhost:3000"

const Presupuesto = () => {

  

    const catvacio : Categoria={
      id : 0,
      UsuarioId : 0,
      nombre : ""
    }

    const vacio : Presupuesto = {
      id:0,
      UsuarioId : 0,
      monto_Mensual : 0,
      categoriaId:0,
      Categoria : catvacio
    }

    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [presupuestoSeleccionado, setPresupuestoSeleccionado]=useState<Presupuesto>(vacio)
    const [presupuestos,setPresupuestos] = useState<Presupuesto[]>([])
    const [usuarioId, setUsuarioId] =useState<number>(0)
    const [showAgregar, setAgregar] = useState<boolean>(false)
    const [showEditarPresupuesto, setEditarPresupuesto] = useState<boolean>(false)
    const [showBorrarPresupuesto, setBorrarPresupuesto] = useState<boolean>(false)
    
    useEffect( ()=> {
      const usuario = sessionStorage.getItem("Usuario");
        console.log("Usuario en sessionStorage:", usuario);
        if (usuario != null) {
            const userData = JSON.parse(usuario);
            console.log("Datos parseados:", userData);
            if(userData != null && userData.correo){
              setUsuarioId(userData.id)
              console.log(userData.id)}
              
        }
  
      },[])

    

    const httpObtenerPresupuestos = async (UsuarioId:number) => {
      const url = URL_BACKEND+"/presupuestos?UsuarioId="+UsuarioId
      const resp = await fetch(url)
      const data = await resp.json()
        if (data.msg == "") {
            const listaPresupuestos = data.presupuestos
            setPresupuestos(listaPresupuestos)
            console.log(listaPresupuestos)
        }else {
            console.error(`Error al obtener usuarios: ${data.msg}`)
        }
      }
    
    const httpObtenerCategorias = async () => {
      const url = URL_BACKEND+"/categorias"
      const resp = await fetch(url)
      const data = await resp.json()
      if (data.msg == "") {
          const listaCategorias = data.categorias
          setCategorias(listaCategorias)
      }else {
          console.error(`Error al obtener categorias: ${data.msg}`)
      }
    }
    
    const httpAgregarPresupuesto = async (UsuarioId : number, monto_Mensual : number, categoriaId : number) => {
      const url = URL_BACKEND+"/presupuestos"
      const resp = await fetch(url, {
          method : "POST",
          body : JSON.stringify({
            UsuarioId : UsuarioId,
            monto_Mensual : monto_Mensual,
            categoriaId : categoriaId,
          }),
          headers : {
              "Content-Type": "application/json",
          }
      })
      const data = await resp.json()
      if (data.msg == "") {
        console.log(data.usuario)
        setAgregar(false)
      }
  } 

    useEffect( ()=> {
      
      if (usuarioId !== 0) {
        httpObtenerPresupuestos(usuarioId);
        httpObtenerCategorias();
      }
    
      },[usuarioId])

    const httpEditarPresupuesto = async ( monto_Mensual: number,categoriaId: number, PresupuestoSeleccionado : Presupuesto) => {
      const url = URL_BACKEND+"/presupuestos?id="+PresupuestoSeleccionado.id
      const resp = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          PresupuestoSeleccionado : PresupuestoSeleccionado,
          monto_Mensual: monto_Mensual,
          categoriaId : categoriaId
        }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await resp.json()
      if (data.msg === "") {
        setEditarPresupuesto(false)
      } else {
        console.error(`Error al editar usuario: ${data.msg}`)
      }
    }
      
    const httpEliminarPresupuesto = async (PresupuestoEliminar : Presupuesto) => {
      const url = URL_BACKEND+"/presupuestos?id="+PresupuestoEliminar.id
      const resp = await fetch(url, {
          method : "DELETE"
      })
      const data = await resp.json()
      if (data.msg == "") {
        setBorrarPresupuesto(false)
      }else {
          console.error(`Error al eliminar un usuario: ${data.msg}`)
      }
    }
    return (
        <div className="container mt-5 bg-light">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2 className="fw-bold">Mis presupuestos</h2>
      <button className="btn btn-primary" onClick={()=>{
                                setAgregar(true)
                            }}>Agregar</button>
    </div>
    <AgregarPresupuesto showModal={ showAgregar } 
            closeModal={ () => {
              setAgregar(false)
            } }
            Categorias={categorias}
            UsuarioId = {usuarioId}
            AgregarPresupuesto={ async ( UsuarioId : number, monto_Mensual : number, categoriaId : number) => {
              await httpAgregarPresupuesto(UsuarioId,monto_Mensual, categoriaId)
              await httpObtenerPresupuestos(UsuarioId)}}/>
    <div className="card">
      <table className="table table-hover mb-0">
        <thead className="table-primary text-center">
          <tr>
            <th>Categoría</th>
            <th>Monto</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody className="text-center">
        { presupuestos.map((presupuesto : Presupuesto) => {
                return <tr>
                <td scope="row">{presupuesto.Categoria != null 
                                        ? presupuesto.Categoria.nombre 
                                        : "-"}</td>
                <td>{presupuesto.monto_Mensual}</td>
                <td>
                <button className="btn btn-outline-secondary btn-sm me-2" onClick={()=>{setPresupuestoSeleccionado(presupuesto); setEditarPresupuesto(true)}
                            }>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg>
                
              </button>
              <EditarPresupuesto showModal={showEditarPresupuesto} closeModal={()=>{setEditarPresupuesto(false)}} Categorias={categorias} PresupuestoEditar={presupuestoSeleccionado} EditarPresupuesto={ async ( monto_Mensual: number, categoriaId: number, PresupuestoSeleccionado : Presupuesto) => {
                await httpEditarPresupuesto(monto_Mensual,categoriaId, PresupuestoSeleccionado)
                await httpObtenerPresupuestos(PresupuestoSeleccionado.UsuarioId)
            }}/>
              <button className="btn btn-outline-secondary btn-sm" onClick={()=>{
                                setPresupuestoSeleccionado(presupuesto)
                                setBorrarPresupuesto(true);
                            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>
              </button>
              <BorrarPresupuesto showModal={showBorrarPresupuesto} closeModal={()=>{setBorrarPresupuesto(false)}} PresupuestoBorrar={presupuestoSeleccionado} Eliminar={  async (presupuestoSeleccionado : Presupuesto) => {
                        await httpEliminarPresupuesto(presupuestoSeleccionado)
                        await httpObtenerPresupuestos(presupuestoSeleccionado.UsuarioId)
                    }}/>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  </div>
    )
}

export default Presupuesto