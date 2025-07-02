// src/components/navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, TextField, InputAdornment } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Ícone de carrinho do MUI
import SearchIcon from '@mui/icons-material/Search'; // Ícone de busca do MUI
import PersonIcon from '@mui/icons-material/Person'; // Ícone de usuário do MUI

function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: '#192A56' }}> {/* Fundo azul escuro */}
      <Toolbar sx={{ justifyContent: 'space-between', padding: '8px 24px' }}>
        {/* Logo Farmácia */}
        <Button component={Link} to="/home" color="inherit" sx={{ textTransform: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
          <Box sx={{ bgcolor: '#FFC107', p: 0.5, borderRadius: 1, mr: 1, color: '#DC3545' }}>FAR</Box>MÁCIA
        </Button>

        {/* Campo de Busca */}
        <Box sx={{ flexGrow: 1, mx: 4, maxWidth: 400 }}>
          <TextField
            variant="outlined"
            placeholder="Procure..."
            size="small"
            fullWidth
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: 'transparent' },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Links de Navegação e Ícones */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Button component={Link} to="/categorias" color="inherit" sx={{ textTransform: 'none', '&:hover': { color: 'lightblue' } }}>
            Categorias
          </Button>
          <Button component={Link} to="/cadastroCategoria" color="inherit" sx={{ textTransform: 'none', '&:hover': { color: 'lightblue' } }}>
            Cadastrar Categoria
          </Button>
          <Button component={Link} to="/login" sx={{ textTransform: 'none', color: '#FFD700', fontWeight: 'bold', '&:hover': { color: '#FFEB3B' } }}>
            Login
            <PersonIcon sx={{ ml: 0.5 }} />
          </Button>
          <ShoppingCartIcon sx={{ '&:hover': { color: 'lightblue' }, cursor: 'pointer' }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;