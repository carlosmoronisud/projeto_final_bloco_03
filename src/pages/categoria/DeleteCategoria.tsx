/* eslint-disable @typescript-eslint/no-explicit-any */

    import { useNavigate, useParams } from 'react-router-dom';
   import { deleteCategoria, getCategoriaById } from '../../services/CategoriaService';
    import type Categoria from '../../components/models/Categoria';
    import { toast } from 'react-toastify';
    import { CircularProgress } from '@mui/material';

    // Material UI
    import { Box, Typography, Button, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { tratarErro } from '../../services/TratarErro';

    function DeleteCategoria() {
      const navigate = useNavigate();
      const { id } = useParams<{ id: string }>();
      const [categoria, setCategoria] = useState<Categoria | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        if (id) {
          buscarCategoriaPorId(Number(id));
        } else {
          toast.error('ID da categoria não fornecido para exclusão.');
          navigate('/categorias');
        }
      }, [buscarCategoriaPorId, id, navigate]);

      async function buscarCategoriaPorId(categoriaId: number) {
        try {
          const categoriaExistente = await getCategoriaById(categoriaId);
          setCategoria(categoriaExistente);
          setLoading(false);
        } catch (error: any) {
          tratarErro(error, 'Erro ao buscar a categoria para exclusão.');
          navigate('/categorias');
        }
      }

      async function onDelete() {
        if (id) {
          try {
            await deleteCategoria(Number(id));
            toast.success('Categoria deletada com sucesso!');
            navigate('/categorias');
          } catch (error: any) {
            tratarErro(error, 'Erro ao deletar a categoria.');
          }
        }
      }

      function onCancel() {
        navigate('/categorias');
      }

      if (loading) {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <CircularProgress color="primary" />
          </Box>
        );
      }

      if (!categoria) {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', p: 4 }}>
            <Typography variant="h6" color="error.main">Categoria não encontrada.</Typography>
            <Button variant="contained" onClick={() => navigate('/categorias')} sx={{ mt: 2 }}>
              Voltar para Categorias
            </Button>
          </Box>
        );
      }

      return (
        <Box sx={{ p: 4, maxWidth: '600px', mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh' }}>
          <Typography variant="h4" component="h1" align="center" color="error.main" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            Deletar Categoria
          </Typography>
          <Paper sx={{ p: 4, boxShadow: 3, borderRadius: 2, textAlign: 'center', width: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Você realmente deseja deletar a categoria: <span style={{ fontWeight: 'bold' }}>{categoria.nome}</span> (ID: {categoria.id})?
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
              <Button
                variant="outlined"
                onClick={onCancel}
                sx={{ textTransform: 'none' }}
              >
                Não
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={onDelete}
                sx={{ textTransform: 'none' }}
              >
                Sim
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    }

    export default DeleteCategoria;