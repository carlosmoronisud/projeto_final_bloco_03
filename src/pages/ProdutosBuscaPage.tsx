/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate, Link, useSearchParams } from 'react-router-dom'; // <<<< Importe useSearchParams

// Removido: import { useSearch } from '../../contexts/SearchContext';

import { CircularProgress } from '@mui/material';

// Material UI
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { getAllProdutos, getProdutosByNome } from '../services/ProdutoService';
import type Produto from '../components/models/Produto';
import { tratarErro } from '../services/TratarErro';
import { useEffect, useState } from 'react';

function ProdutosBuscaPage() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // <<<< NOVO: Obter searchParams da URL
    const searchTerm = searchParams.get('nome') || ''; // <<<< Obter o termo 'nome' da URL ou vazio

    async function buscarProdutosFiltrados() {
        setLoading(true);
        try {
            let response: Produto[];
            if (searchTerm) { // Se há um termo de busca, chame a API de busca por nome
                response = await getProdutosByNome(searchTerm);
            } else { // Se o termo estiver vazio, pode mostrar todos, ou uma mensagem de "nenhum termo"
                response = await getAllProdutos(); // Retorna todos se a busca for vazia na URL
            }
            setProdutos(response);
        } catch (error: any) {
            tratarErro(error, 'Erro ao buscar produtos.');
        } finally {
            setLoading(false);
        }
    }

    // Este useEffect agora depende de searchTerm (lido da URL)
    useEffect(() => {
        buscarProdutosFiltrados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]); // Re-busque produtos sempre que searchTerm (na URL) mudar

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
                Resultados da Busca
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
                {searchTerm ? `Exibindo resultados para: "${searchTerm}"` : 'Nenhum termo de busca fornecido. Exibindo todos os produtos.'}
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
                    {searchTerm ? `Nenhum produto encontrado com o nome "${searchTerm}".` : 'Nenhum produto encontrado. Cadastre um novo!'}
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
                                        <img src={produto.foto} alt={produto.nome} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
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

export default ProdutosBuscaPage;