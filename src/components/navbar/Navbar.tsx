// src/components/navbar/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importe useNavigate

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
import { useSearch } from '../../../contexts/SearchContext';

function Navbar() {
  const { searchTerm, setSearchTerm } = useSearch(); // <<<< Obter searchTerm e setSearchTerm do useSearch
  const navigate = useNavigate(); // Hook para navegação programática

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Atualiza o termo de busca no contexto
  };

  const handleSearchSubmit = (event: React.FormEvent) => { // Novo handler para submissão (Enter)
    event.preventDefault(); // Previne o recarregamento da página padrão de um formulário
    // Ao submeter a busca, sempre navegamos para a página de produtos
    navigate('/produtos');
  };

  // Função para lidar com o clique no ícone de lupa
  const handleSearchIconClick = () => {
    // Se o usuário clicar na lupa, também o levamos para a página de produtos
    navigate('/produtos');
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
            value={searchTerm} // Conecta o valor do input ao estado do contexto
            onChange={handleSearchChange} // Atualiza o estado do contexto ao digitar
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
                  {/* Ícone de lupa que também aciona a navegação */}
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