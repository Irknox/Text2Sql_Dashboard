import React, { useState } from 'react';
import { Box, Typography, Divider, Paper, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Cards_Data from '../components/Cards_Data';

const Dash_Home = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F7FA' }}>
      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}>
        <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>Distribuidora Patitos</Typography>
        <Divider />
        <List>
          {['Dashboard', 'Clientes', 'Productos', 'Ventas', 'Despachos'].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1, p: 4, ml: '240px' }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h3" gutterBottom>Visualización de datos</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Análisis general de las métricas
          </Typography>
        </Paper>

        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5">Gráfica 1: Datos generales</Typography>
            <Divider sx={{ my: 1 }} />
            <Cards_Data />
          </Paper>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5">Gráfica 2:</Typography>
            <Divider sx={{ my: 1 }} />
          </Paper>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5">Gráfica 3:</Typography>
            <Divider sx={{ my: 1 }} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dash_Home;
