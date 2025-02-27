import { useEffect, useState } from "react";
import TablaHistorial from "./TablaHistorial";

interface elementosTabla {
    id: string;
    nombre: string;
    correo: string;
    fecha: string;
    hora: string;
    accion: string;
}

const URL_BACKEND = import.meta.env.VITE_URL_BACKEND || "http://localhost:3000"

const Historial = () => {
    const [tabla, setTabla] = useState<elementosTabla[]>([]);

    useEffect(() => {
        fetch(URL_BACKEND+"/access-logs")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener los datos");
                }
                return response.json();
            })
            .then((data) => {
                const formattedData = data.map((log: any) => ({
                    id: log.id.toString(),
                    nombre: log.Usuario?.nombre || "Desconocido",
                    correo: log.Usuario?.correo || "Sin correo",
                    fecha: new Date(log.access_time).toLocaleDateString(),
                    hora: new Date(log.access_time).toLocaleTimeString(),
                    accion: log.action
                }));
                setTabla(formattedData);
            })
            .catch(error => console.error("Error al obtener historial:", error));
    }, []);

    return (
        <div>
            <TablaHistorial listaElementos={tabla} />
        </div>
    );
}

export default Historial;