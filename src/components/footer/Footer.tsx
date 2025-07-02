// src/components/footer/Footer.tsx
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#12203F', color: 'white', p: 3, textAlign: 'center' }}> {/* Fundo azul bem escuro */}
      <Typography variant="body1" sx={{ mb: 1 }}>
        &copy; 2025 Farmácia Online. Todos os direitos reservados.
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Acesse Nossas Redes Sociais
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ '&:hover': { color: 'lightblue' } }}>
          <FacebookIcon sx={{ fontSize: 32 }} />
        </IconButton>
        <IconButton href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ '&:hover': { color: 'lightblue' } }}>
          <InstagramIcon sx={{ fontSize: 32 }} />
        </IconButton>
        <IconButton href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ '&:hover': { color: 'lightblue' } }}>
          <LinkedInIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Footer;