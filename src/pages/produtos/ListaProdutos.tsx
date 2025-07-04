/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, Link } from 'react-router-dom';
import { getAllProdutos } from '../../services/ProdutoService';
import { CircularProgress } from '@mui/material';
// Material UI
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import type Produto from '../../components/models/Produto';
import { tratarErro } from '../../services/TratarErro';
import { useEffect, useState } from 'react';

function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    async function buscarProdutos() {
        setLoading(true);
        try {
            const response = await getAllProdutos();          
            setProdutos(response);        
        } catch (error: any) {
            tratarErro(error, 'Erro ao buscar produtos.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, []); 

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
            <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                Lista de Produtos
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/cadastroProduto')}
                    sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                >
                    Cadastrar Novo Produto
                </Button>
            </Box>

            {produtos.length === 0 ? (
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 8 }}>
                </Typography>
            ) : (
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <Table aria-label="products table">
                        <TableHead sx={{ bgcolor: 'primary.light' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Nome</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Preço</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Foto</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Categoria</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {produtos.map((produto) => (
                                <TableRow key={produto.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{produto.id}</TableCell>
                                    <TableCell>{produto.nome}</TableCell>
                                    <TableCell>R$ {produto.preco?.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <img
                                            src={produto.foto && produto.foto !== "" ? produto.foto : "https://via.placeholder.com/50x50/F5F5F5/808080?text=NF"} // "NF" = No Photo
                                            alt={produto.nome}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    </TableCell>
                                    <TableCell>{produto.categoria?.nome || 'N/A'}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            component={Link}
                                            to={`/editarProduto/${produto.id}`}
                                            sx={{ minWidth: 'auto', p: 0.5, color: 'primary.main', '&:hover': { color: 'primary.dark' } }}
                                        >
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            component={Link}
                                            to={`/deletarProduto/${produto.id}`}
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

export default ListaProdutos;


