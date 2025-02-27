import { useState } from "react";
import { elementoAgregar } from "./PaginaEgresos";

interface AgregarEgresoModalProps {
    showModal : boolean;
    closeModal : () => void;
    handleAgregarEgreso : (elem : elementoAgregar) => void;
}

const AgregarEgresoModal = (props : AgregarEgresoModalProps) => {
    
    const UsuarioId = 1

    const [monto, setMonto] = useState<number>(0.00)
    // Date es YYYY MM DD , el mes debe ser -1 , osea, 0 es enero, 1 es febrero , etc....
    const [fecha, setFecha] = useState<Date>(new Date(2000,0,1))
    const [fechaString, setFechaString] = useState<string>("")
    const [descripcion, setDescripcion] = useState<string>("")
    const [recursivo, setRecursivo] = useState<boolean>(false)
    const [categoriaId, setCategoriaId] = useState<number>(1)

    const resetearDatos = () => {
        setMonto(0.00)
        setFecha(new Date(2000,0,1))
        setFechaString("")
        setDescripcion("")
        setRecursivo(false)
        setCategoriaId(1)
    }

    return <>{props.showModal && <div className="modal-backdrop fade show"></div>}
            <div className={ props.showModal == true ? "modal fade show d-block" : "modal fade"} tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title w-100 text-center" id="exampleModalLabel">Agregar gasto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => {props.closeModal()}}></button>
                        </div>
                        <div className="modal-body">
                            <form id="formu">
                                <div className="form-group row position-relative">
                                    <label className="col-sm-3 col-form-label position-absolute start-0">Fecha</label>
                                    <div className="col-sm-9 offset-sm-3">
                                        <input type="date" className="form-control" id="fecha" value={fechaString} onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                                            const valores = e.target.value.split("-",3)
                                            console.log("valores: " + valores)
                                            const dateFec = new Date(parseInt(valores[0]), parseInt(valores[1]) - 1 , parseInt(valores[2]))
                                            setFecha(dateFec)
                                            console.log(dateFec)
                                            setFechaString(valores[0] + "-"+ valores[1]+"-"+ valores[2])
                                        }} required />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row position-relative">
                                    <label className="col-sm-3 col-form-label position-absolute start-0">Categoría</label>
                                    <div className="col-sm-9 offset-sm-3">
                                        <select className="form-select" value={categoriaId} onChange={(e : React.ChangeEvent<HTMLSelectElement>) => {
                                            setCategoriaId(parseInt(e.target.value))
                                        }} required>
                                            <option value="1">Servicios</option>
                                            <option value="2">Alimentación</option>
                                            <option value="3">Ocio</option>
                                        </select>
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row position-relative">
                                    <label className="col-sm-3 col-form-label position-absolute start-0">Descripción</label>
                                    <div className="col-sm-9 offset-sm-3">
                                        <input type="text" className="form-control input-lg" id="descripcionText" value={descripcion} onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                                            setDescripcion(e.target.value)
                                        }} required />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row position-relative">
                                    <label className="col-sm-3 col-form-label position-absolute start-0">Monto</label>
                                    <div className="col-sm-9 offset-sm-3">
                                        <input type="number" className="form-control" id="monto" step="0.01" min="0.00" placeholder="0.00" value={monto} onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                                            setMonto(parseFloat(e.target.value))
                                        }} required />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group row position-relative align-items-center">
                                    <label className="col-sm-3 col-form-label position-absolute start-0">Recurrente</label>
                                    <div className="col-sm-9 offset-sm-3">
                                        <input type="checkbox" className="form-check-input" id="recuBool" onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                                            console.log(e.currentTarget.checked)
                                            setRecursivo(e.currentTarget.checked)
                                        }} />
                                    </div>
                                </div>
                                <br />
                                <div className="modal-footer d-flex justify-content-center gap-2">
                                    <button type="button" className="btn btn-secondary w-25" data-bs-dismiss="modal" onClick={() => {props.closeModal()}}>Cancelar</button>
                                    <button type="button" className="btn btn-primary w-25" data-bs-dismiss="modal" id="but_agregar" onClick={async () => {
                                        if(monto == 0.00 || fechaString == "" || descripcion == "" || categoriaId == 0){
                                            return //Falta llenar algun dato, no procesar.
                                        }else{
                                            props.handleAgregarEgreso({UsuarioId: UsuarioId, monto : monto, fecha : fecha, descripcion : descripcion,  recursivo : recursivo, categoriaId : categoriaId})
                                            resetearDatos()
                                        }
                                    }}>Aceptar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div></>
}

export default AgregarEgresoModal
