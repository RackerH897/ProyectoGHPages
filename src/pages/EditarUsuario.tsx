import { useEffect, useState } from "react";
import { Usuarios } from "./Tabla_usuarios_admin";

interface EditarioUsuarioProps {
    closeModal : () => void
    showModal : boolean;
    UsuarioSeleccionadoEditar : Usuarios
    EditarUsuario : (id:number, nombreUsuario : string, correo : string, contraseña : string, rol : number) => void
}

const EditarUsuario = (props : EditarioUsuarioProps) => {
    
    const [id, setId] = useState<number>(props.UsuarioSeleccionadoEditar.id)
    const [nombreUsuario, setNombreUsuario] = useState<string>(props.UsuarioSeleccionadoEditar.nombre)
    const [correo, setCorreo] = useState<string>(props.UsuarioSeleccionadoEditar.correo)
    const [contraseña, setContraseña] = useState<string>(props.UsuarioSeleccionadoEditar.contraseña)
    const [rol, setRol] = useState<number>(props.UsuarioSeleccionadoEditar.rol)
    
    const nombreUsuarioChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        setNombreUsuario(e.target.value)
    }
    
    const correoChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        setCorreo(e.target.value)
    }
    
    const contraseñaChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        setContraseña(e.target.value)
    }
    
    const rolChangeHandler = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setRol(parseInt(e.target.value))
    }

    useEffect(() => {
          setId(props.UsuarioSeleccionadoEditar.id)
          setNombreUsuario(props.UsuarioSeleccionadoEditar.nombre);
          setCorreo(props.UsuarioSeleccionadoEditar.correo);
          setContraseña(props.UsuarioSeleccionadoEditar.contraseña);
          setRol(props.UsuarioSeleccionadoEditar.rol)
      }, [props.UsuarioSeleccionadoEditar]);

    return (
        <div className={props.showModal == true ? "modal fade show d-block bg-dark bg-opacity-50" : "modal fade"}>
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                
                <h5 className="text-center m-4">Editar Usuario</h5>
                
                <div className="modal-body">
            <div className="mb-3 row ps-1 ms-1">
                <label className="col-sm-3 col-form-label ps-3">Nombre</label>
                <div className="col-8 ps-5">
                    <input type="text" 
                            className="form-control" 
                            id="inputNombre" 
                            placeholder="Ingresar nombre"
                            value={nombreUsuario} 
                            onChange={nombreUsuarioChangeHandler}
                            required/>
                </div>
            </div>
            <div className="mb-3 row ms-1">
                <label className="col-sm-3 col-form-label">Correo</label>
                <div className="col-8 ps-5 ms-1">
                    <input type="text" 
                            className="form-control" 
                            id="inputCorreo" 
                            placeholder="Ingresar correo" 
                            value={correo}
                            onChange={correoChangeHandler} 
                            required/>
                </div>
            </div>
            <div className="mb-3 row ms-1">
                <label className="col-sm-4 col-form-label ps-1">Contraseña</label>
                <div className="col-7">
                    <input type="password" 
                            className="form-control" 
                            id="inputPassword" 
                            placeholder="Ingresar contraseña" 
                            onChange={contraseñaChangeHandler} 
                            value={contraseña} 
                            required/>
                </div>
            </div>
            <div className="mb-3 row ps-3">
                <label className="col-sm-4 col-form-label">Rol usuario</label>
                <div className="col-7 mb-3">
                    <select className="form-select" 
                            id="rol"
                            value={rol}
                            onChange={rolChangeHandler}
                            >
                    <option selected value={1}>User</option>
                    <option value={2}>Admin</option>
                    </select>
                </div>
            </div>
            <div className="row p-4 ms-3">
                <div className="col-6">
                    <button type="button" className="btn btn-secondary w-75" onClick={ () =>  {
                            props.closeModal()
                        } }>Cancelar</button>
                </div>
                <div className="col-6">  
                    <button type="button" 
                            className="btn btn-primary w-75"
                            onClick={ () =>  {
                                props.EditarUsuario(id,nombreUsuario, correo, contraseña,rol)
                            } }
                            >Aceptar</button>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
    );
}

export default EditarUsuario