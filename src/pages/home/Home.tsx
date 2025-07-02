// src/pages/home/Home.tsx
import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

function Home() {
  return (
    <Box sx={{ flexGrow: 1, p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px - 80px)' }}> {/* Ajuste de altura */}
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Seção de Texto e Botão (lado esquerdo) */}
        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h2" component="h1" fontWeight="bold" color="text.primary" gutterBottom>
            Seja bem vinde!
          </Typography>
          <Typography variant="h5" component="p" color="text.secondary" sx={{ mb: 4 }}>
            Aqui você encontra Medicamentos e Cosméticos!
          </Typography>
          <Button variant="contained" color="primary" sx={{ bgcolor: '#673AB7', '&:hover': { bgcolor: '#5E35B1' }, py: 1.5, px: 4, fontSize: '1.1rem' }}>
            Cadastrar Produto
          </Button>
        </Grid>

        {/* Seção da Imagem (lado direito) */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="img"
            src="https://via.placeholder.com/600x400/9370DB/FFFFFF?text=Ilustracao+Farmaceuticos" // Substitua pela imagem real
            alt="Ilustração de Farmacêuticos"
            sx={{ maxWidth: '100%', height: 'auto', borderRadius: 2, boxShadow: 3 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;