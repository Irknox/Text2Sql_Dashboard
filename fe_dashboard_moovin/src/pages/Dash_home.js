import React, { useState } from 'react';
<<<<<<< HEAD
import { Box, Typography, Divider, Paper, Drawer, List, ListItem, ListItemText } from '@mui/material';
import Last_six_months_sales_chart from '../components/Last_six_months_sales_chart';
import Sales_week from '@/components/sales_week';
=======
import { Box, Typography, Divider, Paper, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import Cards_Data from '../components/Cards_Data';
>>>>>>> e2ef17ad03d4c172ceaef0c96942322cf3ebd3bc

const Dash_Home = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F0F4F8' }}>
      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: 250, flexShrink: 0, '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box', backgroundColor: '#2E7D32', color: 'white' } }}>
        <Typography variant="h6" sx={{ p: 2, textAlign: 'center', fontWeight: 'bold' }}>Distribuidora Patitos</Typography>
        <Divider sx={{ backgroundColor: 'white' }} />
        <List>
          {['Dashboard', 'Clientes', 'Productos', 'Ventas', 'Despachos'].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} sx={{ textAlign: 'center' }} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1, p: 4, ml: '250px' }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: '#E8F5E9' }}>
          <Typography variant="h3" gutterBottom sx={{ color: '#2E7D32', fontWeight: 'bold' }}></Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Análisis general de las métricas
          </Typography>
        </Paper>

        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: '#FAFAFA' }}>
            <Typography variant="h5" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>Resumen de Ventas</Typography>
            <Divider sx={{ my: 1 }} />
            <Sales_week />
          </Paper>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: '#FAFAFA' }}>
            <Typography variant="h5" sx={{ color: '#2E7D32', fontWeight: 'bold' }}>Ventas Últimos 6 Meses</Typography>
            <Divider sx={{ my: 1 }} />
            <Last_six_months_sales_chart /> 
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dash_Home;
