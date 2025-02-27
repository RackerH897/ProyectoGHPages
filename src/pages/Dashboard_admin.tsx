import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard_admin = () => {
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [usuariosPorMes, setUsuariosPorMes] = useState<number[]>(Array(12).fill(0));


    // Obtener cantidad de usuarios desde la API
    useEffect(() => {
        // Fetch para el total de usuarios (mantiene la funcionalidad 1)
        fetch("http://localhost:3000/usuarios/contar")
            .then((response) => response.json())
            .then((data) => setTotalUsuarios(data.totalUsuarios))
            .catch((error) => console.error("Error al obtener usuarios:", error));
        
        fetch("http://localhost:3000/usuarios/usuarios-por-mes")
        .then((response) => response.json())
        .then((data) => {
            const usuariosMesArray = Array(12).fill(0);

            data.usuariosPorMes.forEach((item: { Mes: string; cantidad: number }) => {
                const mes = new Date(item.Mes).getMonth(); // Extrae el mes (0 = Enero, 11 = Diciembre)
                usuariosMesArray[mes] = item.cantidad;
            });

            setUsuariosPorMes(usuariosMesArray);
        })
        .catch((error) => console.error("Error al obtener usuarios por mes:", error));
    }, []);
    

    const dataMensuales = {
        labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        datasets: [
            {
                label: "# Usuarios:",
                data: usuariosPorMes, // Usa los datos obtenidos
                backgroundColor: "rgba(59, 130, 246, 0.8)",
                borderColor: "rgba(37, 99, 235, 1)",
                borderWidth: 1,
            },
        ],
    };
    
    

    const optionsMensuales = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
    };

    return (
        <div className="d-flex justify-content-center align-items-center overflow-hidden" style={{ minHeight: "100vh", backgroundColor: "#f0f0f0", margin: "0", padding: "0" }}>
            <div className="container">
                {/* Total de Usuarios */}
                <div className="row justify-content-center g-4 mb-4">
                    <div className="col-12 col-md-12">
                        <h5 className="text-left mb-3">Total de usuarios:</h5>
                        <div className="p-3 rounded-3 bg-light">{totalUsuarios}</div>
                    </div>
                </div>

                {/* Gráfico de Usuarios por Mes */}
                <div className="row justify-content-center g-4 mb-4">
                    <div className="col-12 col-md-12">
                        <h5 className="text-left mb-3">Nuevos usuarios por mes:</h5>
                        <div className="p-3 rounded-3 bg-light" style={{ height: "40vh", minHeight: "250px", width: "100%" }}>
                            <Bar data={dataMensuales} options={optionsMensuales} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard_admin;
