import React, { useEffect, useState } from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Grid, Typography } from '@mui/material';
import { getRecargasData, getSimsData } from '../services/Prevision_services';

const PS_component = () => {
    const [recargasData, setRecargasData] = useState(0);
    const [simsData, setSimsData] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recargas = await getRecargasData();
                const sims = await getSimsData();
                setRecargasData(recargas);
                setSimsData(sims);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <Typography variant="h6" align="center">Previsión Recargas</Typography>
                <Gauge 
                    value={recargasData} 
                    startAngle={-110} 
                    endAngle={110} 
                    sx={{
                        width: '80%', 
                        height: 200,  
                        [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 30, 
                            transform: 'translate(0px, 0px)',
                        }
                    }}
                />
            </Grid>

            <Grid item xs={6}>
                <Typography variant="h6" align="center">Previsión SIMs</Typography>
                <Gauge 
                    value={simsData} 
                    startAngle={-110} 
                    endAngle={110} 
                    sx={{
                        width: '80%', 
                        height: 200,  
                        [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 30, 
                            transform: 'translate(0px, 0px)',
                        }
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default PS_component;
