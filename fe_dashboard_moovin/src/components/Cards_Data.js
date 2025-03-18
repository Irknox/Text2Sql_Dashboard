import React, { useEffect, useState } from 'react';
import { getBalanceData, getCurrentSalesData, getSalesVariationData } from '../services/Cards_Services';
import { Card, CardContent, Typography, Box, CircularProgress, Alert } from '@mui/material';

const Cards_Data = () => {
    const [balance, setBalance] = useState(null);
    const [sales, setSales] = useState(null);
    const [variation, setVariation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [balanceData, salesData, variationData] = await Promise.all([
                    getBalanceData(),
                    getCurrentSalesData(),
                    getSalesVariationData()
                ]);

                setBalance(balanceData);
                setSales(salesData);
                setVariation(variationData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4">Dashboard</Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Resumen de métricas importantes
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Card sx={{ flex: 1, backgroundColor: '#E3F2FD' }}>
                    <CardContent>
                        <Typography variant="h6">Balance X mes</Typography>
                        <Typography variant="h4" sx={{ mt: 1 }}>{balance}</Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>Todos balance por mes</Typography>
                    </CardContent>
                </Card>

                <Card sx={{ flex: 1, backgroundColor: '#E8F5E9' }}>
                    <CardContent>
                        <Typography variant="h6">Saldo Actual</Typography>
                        <Typography variant="h4" sx={{ mt: 1 }}>{sales}</Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>Total de saldo actual</Typography>
                    </CardContent>
                </Card>

                <Card sx={{ flex: 1, backgroundColor: '#F3E5F5' }}>
                    <CardContent>
                        <Typography variant="h6">Monto Vendido</Typography>
                        <Typography variant="h4" sx={{ mt: 1 }}>{variation}</Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>Total de monto vendido</Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Cards_Data;
