/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';


import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form'; // Adicionado Controller
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Material UI
import { Box, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { getAllCategorias } from '../../services/CategoriaService';
import { postProduto, tratarErro } from '../../services/Service';
import type Categoria from '../../components/models/Categoria';
import type Produto from '../../components/models/Produto';
import { useEffect, useState } from 'react';

// Esquema de validação para CADASTRO de Produto
const produtoCadastroSchema = z.object({
    nome: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.').max(255, 'O nome deve ter no máximo 255 caracteres.'),
    preco: z.number().min(0.01, 'O preço deve ser maior que zero.'),
    foto: z.string().url('A foto deve ser uma URL válida.').max(5000, 'A URL da foto deve ter no máximo 5000 caracteres.'),
    categoria: z.object({
        id: z.number({ required_error: 'A categoria é obrigatória.' }).min(1, 'Selecione uma categoria válida.'),
        nome: z.string().optional()
    }, { required_error: 'A categoria é obrigatória.' }),
});

type ProdutoFormCadastroInputs = z.infer<typeof produtoCadastroSchema>;

function FormProdutoCadastro() {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loadingCategorias, setLoadingCategorias] = useState(true);

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<ProdutoFormCadastroInputs>({ // Adicionado 'control' e 'setValue'
        resolver: zodResolver(produtoCadastroSchema),
        defaultValues: {
            nome: '',
            preco: 0,
            foto: '',
            categoria: { id: 0, nome: '' },
        },
    });

    useEffect(() => {
        async function fetchCategorias() {
            setLoadingCategorias(true);
            try {
                const response = await getAllCategorias();
                setCategorias(response);
            } catch (error) {
                tratarErro(error, 'Erro ao carregar categorias.');
            } finally {
                setLoadingCategorias(false);
            }
        }
        fetchCategorias();
    }, []);

    const onSubmit = async (data: ProdutoFormCadastroInputs) => {
        console.log("Dados enviados para cadastro de produto:", data);

        try {
            const produtoToSave: Produto = {
                id: 0, 
                nome: data.nome,
                preco: data.preco,
                foto: data.foto,
                categoria: data.categoria.id ? { id: data.categoria.id, nome: categorias.find(cat => cat.id === data.categoria?.id)?.nome || '' } : undefined,
            };

            await postProduto(produtoToSave);
            toast.success('Produto cadastrado com sucesso!');
            reset();
            navigate('/produtos');
        } catch (error) {
            tratarErro(error, 'Erro ao salvar o produto.');
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh' }}>
            <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                Cadastrar Novo Produto
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2, p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                    id="nome" label="Nome do Produto" variant="outlined" fullWidth
                    {...register('nome')}
                    error={!!errors.nome} helperText={errors.nome ? errors.nome.message : ''}
                />
                <TextField
                    id="preco" label="Preço" variant="outlined" fullWidth type="number"
                    {...register('preco', { valueAsNumber: true })}
                    error={!!errors.preco} helperText={errors.preco ? errors.preco.message : ''}
                    InputProps={{ inputProps: { step: "0.01" } }} // Corrigido
                />
                <TextField
                    id="foto" label="URL da Foto" variant="outlined" fullWidth
                    {...register('foto')}
                    error={!!errors.foto} helperText={errors.foto ? errors.foto.message : ''}
                />

                <FormControl fullWidth error={!!errors.categoria || !!(errors.categoria as any)?.id}>
                    <InputLabel id="categoria-label">Categoria</InputLabel>
                    <Controller // <<<<< Usando Controller
                        name="categoria.id"
                        control={control}
                        rules={{ required: 'A categoria é obrigatória.' }} // Validação no Controller
                        render={({ field }) => (
                            <Select
                                labelId="categoria-label"
                                id="categoria"
                                label="Categoria"
                                value={field.value ?? ''}
                                onChange={(e) => {
                                    const value = String(e.target.value) === '' ? 0 : Number(e.target.value);
                                    field.onChange(value);
                                }}
                            >
                                {loadingCategorias ? (
                                    <MenuItem disabled value="">
                                        <CircularProgress size={20} sx={{ mr: 1 }} /> Carregando categorias...
                                    </MenuItem>
                                ) : categorias.length === 0 ? (
                                    <MenuItem disabled value="">Nenhuma categoria disponível</MenuItem>
                                ) : (
                                    categorias.map((cat) => (
                                        <MenuItem key={cat.id} value={cat.id}>
                                            {cat.nome}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        )}
                    />
                    
                    {(errors.categoria || (errors.categoria as any)?.id) && (
                        <Typography color="error" variant="caption">
                            {(errors.categoria as any)?.id?.message || (errors.categoria as any)?.message || 'A categoria é obrigatória.'}
                        </Typography>
                    )}
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button variant="outlined" onClick={() => navigate('/produtos')} sx={{ textTransform: 'none' }}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' }, textTransform: 'none' }}>
                        Cadastrar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default FormProdutoCadastro;