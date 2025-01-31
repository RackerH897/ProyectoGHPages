import "./CSS/Tabla_Usuario.css"

interface elementosTabla {
  fecha : string;
  categoria : string;
  descripcion : string;
  monto : string;
}

interface usuarioProps {
  listaElementos : elementosTabla[];
  openModal : () => void
}

const TablaUsuario = (props : usuarioProps) => {

  return (
      <div className="container mt-5 bg-light">
        <div className="d-flex align-items-center gap-2 mb-3">
        <h2 className="fw-bold">Mis usuarios</h2>
        <button className="btn btn-primary ms-auto" onClick={() => {props.openModal()}}>
            <i className="bi bi-funnel"></i> Filtrar
        </button>
        <button className="btn btn-secondary">Agregar</button>
        </div>
        <div className="card">
          <table className="table table-hover mb-0">
            <thead className="table-primary text-center">
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Categoria</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Recurrente</th>
                <th scope="col">Monto</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody id="TBody">
              <tr>
                <td scope="row">12/12/2024</td>
                <td>Ocio</td>
                <td>La niebla, libro de Stephen King</td>
                <td>No</td>
                <td>S/. 29.99</td>
                <td>
                    <i className="lapiz">Editar</i> 
                    <i className="basura">Borrar</i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default TablaUsuario