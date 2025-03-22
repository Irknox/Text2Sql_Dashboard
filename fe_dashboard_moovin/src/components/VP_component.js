import React, { useEffect, useState } from 'react';
import { fetchVentasPorProvincia } from '../services/Province_services';
import ReactECharts from 'echarts-for-react';
import { Typography } from '@mui/material';

const VP_component = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchVentasPorProvincia();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const options = {
        title: {
            text: 'Ventas Acumuladas por Provincia',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'right',
            data: data.map(item => item.provincia)
        },
        series: [
            {
                name: 'Ventas',
                type: 'pie',
                radius: ['40%', '70%'],
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 2,
                    borderRadius: 5
                },
                data: data.map(item => ({
                    value: item.monto,
                    name: item.provincia
                }))
            }
        ]
    };

    if (loading) return <Typography>Cargando datos...</Typography>;
    if (error) return <Typography>Error al cargar datos: {error}</Typography>;

    return (
        <div style={{
            width: '100%',
            height: '80%',
            backgroundColor: '#f4f4f4',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            justifySelf:"right",
            alignSelf:"center"
        }}>
            <ReactECharts option={options} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default VP_component;
