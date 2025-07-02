/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProdutoById, deleteProduto, tratarErro } from '../../services/Service';

import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

// Material UI
import { Box, Typography, Button, Paper } from '@mui/material';
import type Produto from '../../components/models/Produto';

function DeleteProduto() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [produto, setProduto] = useState<Produto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            buscarProdutoPorId(Number(id));
        } else {
            toast.error('ID do produto não fornecido para exclusão.');
            navigate('/produtos');
        }
    }, [id, navigate]);

    async function buscarProdutoPorId(produtoId: number) {
        try {
            const produtoExistente = await getProdutoById(produtoId);
            setProduto(produtoExistente);
            setLoading(false);
        } catch (error: any) {
            tratarErro(error, 'Erro ao buscar o produto para exclusão.');
            navigate('/produtos');
        }
    }

    async function onDelete() {
        if (id) {
            try {
                await deleteProduto(Number(id));
                toast.success('Produto deletado com sucesso!');
                navigate('/produtos');
            } catch (error: any) {
                tratarErro(error, 'Erro ao deletar o produto.');
            }
        }
    }

    function onCancel() {
        navigate('/produtos');
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    if (!produto) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', p: 4 }}>
                <Typography variant="h6" color="error.main">Produto não encontrado.</Typography>
                <Button variant="contained" onClick={() => navigate('/produtos')} sx={{ mt: 2 }}>
                    Voltar para Produtos
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh' }}>
            <Typography variant="h4" component="h1" align="center" color="error.main" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                Deletar Produto
            </Typography>
            <Paper sx={{ p: 4, boxShadow: 3, borderRadius: 2, textAlign: 'center', width: '100%' }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Você realmente deseja deletar o produto: <span style={{ fontWeight: 'bold' }}>{produto.nome}</span> (ID: {produto.id})?
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

export default DeleteProduto;