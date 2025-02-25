interface BorrarUsuarioProps {
    showModal : boolean;
    closeModal : () => void
    Eliminar : (id : number) => void
    UsuarioBorrar : number
}

const BorrarUsuario = (props : BorrarUsuarioProps) => {
    return (
        <div className={ props.showModal == true ? "modal fade show d-block bg-dark bg-opacity-50" : "modal fade" } >
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                
                <h5 className="text-center m-4">Aviso!</h5>
                
                <div className="modal-body">
                <div className="text-center mb-5 h5 fs-5 m-3">
            ¿Esta seguro de que desea eliminar este registro?
        </div>
        <div className="row ps-5 pe-1 mb-4">
          <div className="col-6">
            <button type="button" className="btn btn-secondary col-10" onClick={ () =>  {
                            props.closeModal()
                        } } >No</button>
          </div>
          <div className="col-6">  
            <button type="button" className="btn btn-primary col-10" onClick={ () =>  {
                        props.Eliminar(props.UsuarioBorrar)    
                        } }>SI</button>
          </div>
        </div>
            </div>
            </div>
            </div>
            </div>)
}

export default BorrarUsuario