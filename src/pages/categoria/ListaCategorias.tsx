/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import type Categoria from '../../components/models/Categoria';
import { useEffect, useState } from 'react';
import { getAllCategorias } from '../../services/CategoriaService';
import { tratarErro } from '../../services/TratarErro';
import { ClipLoader } from 'react-spinners';

function ListaCategorias() {
const [categorias, setCategorias] = useState<Categoria[]>([]);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

async function buscarCategorias() {
  setLoading(true);
  try {
    const response = await getAllCategorias();
    setCategorias(response);
  } catch (error: any) {
    tratarErro(error, 'Erro ao buscar categorias.');
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  buscarCategorias();
}, []);

if (loading) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <ClipLoader color="#36d7b7" size={50} />
    </Box>
  );
}

return (
  <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
    <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
      Categorias de Produtos
    </Typography>

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate('/cadastroCategoria')}
        sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
      >
        Cadastrar Nova Categoria
      </Button>
    </Box>

    {categorias.length === 0 ? (
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 8 }}>Nenhuma categoria encontrada. Cadastre uma nova!</Typography>
    ) : (
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table aria-label="simple table">
          <TableHead sx={{ bgcolor: 'primary.light' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Tipo</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((categoria) => (
              <TableRow key={categoria.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{categoria.id}</TableCell>
                <TableCell>{categoria.nome}</TableCell>
                <TableCell align="center">
                  <Button
                    component={Link} 
                    to={`/editarCategoria/${categoria.id}`}
                    sx={{ minWidth: 'auto', p: 0.5, color: 'primary.main', '&:hover': { color: 'primary.dark' } }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    component={Link} 
                    to={`/deletarCategoria/${categoria.id}`}
                    sx={{ minWidth: 'auto', p: 0.5, color: 'error.main', '&:hover': { color: 'error.dark' } }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </Box>
);
}

export default ListaCategorias;