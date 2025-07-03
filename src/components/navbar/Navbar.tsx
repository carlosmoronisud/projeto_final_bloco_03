// Atualização do Navbar para remover o carrinho e mostrar a foto do usuário + botão de logout

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Material UI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';

// Ícones do Material UI
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useAuth } from '../../contexts/AuthContext';



function Navbar() {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (localSearchTerm) {
      navigate(`/produtos/busca?nome=${localSearchTerm}`);
    } else {
      navigate('/produtos');
    }
  };

  const handleSearchIconClick = () => {
    if (localSearchTerm) {
      navigate(`/produtos/busca?nome=${localSearchTerm}`);
    } else {
      navigate('/produtos');
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#192A56' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '8px 24px' }}>
        <Button
          component={Link}
          to="/home"
          color="inherit"
          sx={{ textTransform: 'none', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Box sx={{ bgcolor: '#FFC107', p: 0.5, borderRadius: 1, mr: 1, color: '#DC3545', lineHeight: 1 }}>FAR</Box>
          <Typography variant="h6" component="span" sx={{ color: 'white' }}>MÁCIA</Typography>
        </Button>

        <Box component="form" onSubmit={handleSearchSubmit} sx={{ flexGrow: 1, mx: 4, maxWidth: 400 }}>
          <TextField
            variant="outlined"
            placeholder="Procure produtos..."
            size="small"
            fullWidth
            value={localSearchTerm}
            onChange={handleSearchChange}
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
                  <SearchIcon sx={{ color: 'action.active', cursor: 'pointer' }} onClick={handleSearchIconClick} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Button component={Link} to="/categorias" color="inherit" sx={{ textTransform: 'none', '&:hover': { color: 'lightblue' } }}>
            <CategoryIcon sx={{ mr: 0.5 }} /> Categorias
          </Button>
          <Button component={Link} to="/produtos" color="inherit" sx={{ textTransform: 'none', '&:hover': { color: 'lightblue' } }}>
            <InventoryIcon sx={{ mr: 0.5 }} /> Produtos
          </Button>
          {!user && (
            <Button
              component={Link}
              to="/login"
              sx={{
                textTransform: 'none',
                color: '#FFD700',
                fontWeight: 'bold',
                '&:hover': { color: '#FFEB3B' }
              }}
            >
              <PersonIcon sx={{ mr: 0.5 }} /> Login
            </Button>
          )}


          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar alt={user.name} src={user.picture} sx={{ width: 32, height: 32 }} />
              <Button
                onClick={() => setUser(null)}
                color="inherit"
                sx={{ textTransform: 'none', fontSize: '0.875rem', '&:hover': { color: 'red' } }}
              >
                Sair
              </Button>
            </Box>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
