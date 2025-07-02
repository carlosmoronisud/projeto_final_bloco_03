import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getAllCategorias as getAllCategoriasService } from '../../services/CategoriaService'; // <-- getAllCategorias do CategoriaService
import type Categoria from '../../components/models/Categoria';
import type Produto from '../../components/models/Produto';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Material UI
import { Box, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { getProdutoById, putProduto } from '../../services/ProdutoService';
import { tratarErro } from '../../services/TratarErro';


// Esquema de validação para EDIÇÃO de Produto
const produtoEdicaoSchema = z.object({
    id: z.number().min(1, 'ID do produto é obrigatório para edição.'),
    nome: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.').max(255, 'O nome deve ter no máximo 255 caracteres.'),
    preco: z.number().min(0.01, 'O preço deve ser maior que zero.'),
    foto: z.string().url('A foto deve ser uma URL válida.').max(5000, 'A URL da foto deve ter no máximo 5000 caracteres.'),
    categoria: z.object({
        id: z.number({ required_error: 'A categoria é obrigatória.' }).min(1, 'Selecione uma categoria válida.'),
        nome: z.string().optional()
    }, { required_error: 'A categoria é obrigatória.' }),
});

type ProdutoFormEdicaoInputs = z.infer<typeof produtoEdicaoSchema>;

function FormProdutoEdicao() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loadingCategorias, setLoadingCategorias] = useState(true);
    const [loadingProduto, setLoadingProduto] = useState(true);

    const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<ProdutoFormEdicaoInputs>({
        resolver: zodResolver(produtoEdicaoSchema),
        defaultValues: {
            id: undefined,
            nome: '',
            preco: 0,
            foto: '',
            categoria: { id: undefined },
        },
    });

    // Ajuda o TypeScript a entender a estrutura dos erros de categoria
    type CategoriaFieldError = {
        id?: { message?: string };
        message?: string;
    };
    const categoriaError: CategoriaFieldError | undefined = errors.categoria as CategoriaFieldError | undefined;

    // Carregar categorias para o Select
    useEffect(() => {
        async function fetchCategorias() {
            setLoadingCategorias(true);
            try {
                const response = await getAllCategoriasService();
                setCategorias(response);
            } catch (error) {
                tratarErro(error, 'Erro ao carregar categorias.');
            } finally {
                setLoadingCategorias(false);
            }
        }
        fetchCategorias();
    }, []);

    // Carregar produto para edição (usar useCallback para a função)
    const buscarProdutoPorId = useCallback(async (produtoId: number) => {
        setLoadingProduto(true);
        try {
            const produtoExistente = await getProdutoById(produtoId);
            setValue('id', produtoExistente.id ?? 0);
            setValue('nome', produtoExistente.nome);
            setValue('preco', produtoExistente.preco);
            setValue('foto', produtoExistente.foto);
            // Definir o valor da categoria no Select. Importante que seja Number e não undefined para o Select.
            setValue('categoria.id', produtoExistente.categoria?.id ?? 0); // Use ?? 0 para garantir que seja um número

        } catch (error) {
            tratarErro(error, 'Erro ao buscar o produto para edição.');
            navigate('/produtos');
        } finally {
            setLoadingProduto(false);
        }
    }, [navigate, tratarErro, getProdutoById, setValue]);

    // Efeito para chamar buscarProdutoPorId
    useEffect(() => {
        if (id) {
            buscarProdutoPorId(Number(id));
        } else {
            toast.error("ID do produto não fornecido para edição.");
            navigate('/produtos');
        }
    }, [id, navigate, buscarProdutoPorId]);


    const onSubmit = async (data: ProdutoFormEdicaoInputs) => {
        console.log("Dados enviados para atualização de produto:", data);

        try {
            const produtoToSave: Produto = {
                id: data.id,
                nome: data.nome,
                preco: data.preco,
                foto: data.foto,
                categoria: data.categoria.id ? { id: data.categoria.id, nome: categorias.find(cat => cat.id === data.categoria?.id)?.nome || '' } : undefined,
            };

            await putProduto(produtoToSave);
            toast.success('Produto atualizado com sucesso!');
            navigate('/produtos');
        } catch (error) {
            tratarErro(error, 'Erro ao salvar o produto.');
        }
    };

    if (loadingCategorias || loadingProduto) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh' }}>
            <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                Editar Produto
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2, p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <input type="hidden" {...register('id', { valueAsNumber: true })} />

                <TextField
                    id="nome" label="Nome do Produto" variant="outlined" fullWidth
                    {...register('nome')}
                    error={!!errors.nome} helperText={errors.nome ? errors.nome.message : ''}
                />
                <TextField
                    id="preco" label="Preço" variant="outlined" fullWidth type="number"
                    {...register('preco', { valueAsNumber: true })}
                    error={!!errors.preco} helperText={errors.preco ? errors.preco.message : ''}
                    InputProps={{ inputProps: { step: "0.01" } }}
                />
                <TextField
                    id="foto" label="URL da Foto" variant="outlined" fullWidth
                    {...register('foto')}
                    error={!!errors.foto} helperText={errors.foto ? errors.foto.message : ''}
                />

                {/* Categoria Select usando Controller */}
                <FormControl fullWidth error={!!categoriaError?.id || !!categoriaError?.message}>
                    <InputLabel id="categoria-label">Categoria</InputLabel>
                    <Controller
                        name="categoria.id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="categoria-label"
                                id="categoria"
                                label="Categoria"
                                value={field.value || ''} // Corrigido para lidar com valores undefined/null
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            >
                                <MenuItem value="">
                                    <em>Selecione uma categoria</em> {/* Opção vazia */}
                                </MenuItem>
                                {categorias.map((categoria) => (
                                    <MenuItem key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    {categoriaError?.id?.message && (
                        <Typography variant="caption" color="error">
                            {categoriaError.id.message}
                        </Typography>
                    )}
                    {categoriaError?.message && (
                        <Typography variant="caption" color="error">
                            {categoriaError.message}
                        </Typography>
                    )}
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button variant="outlined" onClick={() => navigate('/produtos')} sx={{ textTransform: 'none' }}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' }, textTransform: 'none' }}>
                        Atualizar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default FormProdutoEdicao;