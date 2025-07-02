import React, { useState } from 'react'; // <<<< Adicionado useState
import { Link, useNavigate } from 'react-router-dom';


// Material UI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// Ícones do Material UI
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';

function Navbar() {
  const [localSearchTerm, setLocalSearchTerm] = useState(''); // <<<< NOVO: Estado local
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value); // Atualiza o estado local
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Navega para a página de busca com o termo nos query parameters
    if (localSearchTerm) {
      navigate(`/produtos/busca?nome=${localSearchTerm}`);
    } else {
      // Se a busca estiver vazia, vai para a lista completa de produtos
      navigate('/produtos');
    }
  };

  const handleSearchIconClick = () => {
    // Ao clicar na lupa, se tiver termo, navega com a busca, senão para todos os produtos
    if (localSearchTerm) {
      navigate(`/produtos/busca?nome=${localSearchTerm}`);
    } else {
      navigate('/produtos');
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#192A56' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '8px 24px' }}>
        {/* Logo Farmácia */}
        <Button
          component={Link}
          to="/home"
          color="inherit"
          sx={{ textTransform: 'none', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Box sx={{ bgcolor: '#FFC107', p: 0.5, borderRadius: 1, mr: 1, color: '#DC3545', lineHeight: 1 }}>FAR</Box>
          <Typography variant="h6" component="span" sx={{ color: 'white' }}>MÁCIA</Typography>
        </Button>

        {/* Campo de Busca dentro de um form para onSubmit */}
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

        {/* Links de Navegação */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Button component={Link} to="/categorias" color="inherit" sx={{ textTransform: 'none', '&:hover': { color: 'lightblue' } }}>
            <CategoryIcon sx={{ mr: 0.5 }} /> Categorias
          </Button>
          <Button component={Link} to="/produtos" color="inherit" sx={{ textTransform: 'none', '&:hover': { color: 'lightblue' } }}>
            <InventoryIcon sx={{ mr: 0.5 }} /> Produtos
          </Button>
          <Button component={Link} to="/perfil" sx={{ textTransform: 'none', color: '#FFD700', fontWeight: 'bold', '&:hover': { color: '#FFEB3B' } }}>
            <PersonIcon sx={{ mr: 0.5 }} /> Perfil
          </Button>
          <ShoppingCartIcon sx={{ '&:hover': { color: 'lightblue' }, cursor: 'pointer' }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;