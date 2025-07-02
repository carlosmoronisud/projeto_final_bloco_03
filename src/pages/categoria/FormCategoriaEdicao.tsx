/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { putCategoria, getCategoriaById, tratarErro } from '../../services/Service'; // Apenas put e getById

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Typography, Button, TextField } from '@mui/material';
import type Categoria from '../../components/models/Categoria';


// Esquema de validação com Zod (igual ao de cadastro)
const categoriaSchema = z.object({
  id: z.number().optional(), // ID é opcional no schema, mas será obrigatório para o PUT
  nome: z.string()
    .min(3, { message: 'O Nome da Categoria é obrigatório e deve ter no mínimo 3 caracteres.' })
    .max(100, { message: 'O Nome da Categoria deve ter no máximo 100 caracteres.' }),
});

type CategoriaFormInputs = z.infer<typeof categoriaSchema>;

function FormCategoriaEdicao() { // RENOMEADO PARA Edicao
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CategoriaFormInputs>({
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      id: undefined,
      nome: '',
    },
  });

  useEffect(() => {
    if (id) {
      buscarCategoriaPorId(Number(id));
    }
  }, [id]);

  async function buscarCategoriaPorId(categoriaId: number) {
    try {
      const categoriaExistente = await getCategoriaById(categoriaId);
      setValue('id', categoriaExistente.id);
      setValue('nome', categoriaExistente.nome);
    } catch (error: any) {
      tratarErro(error, 'Erro ao buscar a categoria para edição.');
      navigate('/categorias'); // Redireciona de volta se não encontrar
    }
  }

  const onSubmit = async (data: CategoriaFormInputs) => {
    console.log("Dados enviados para atualização (Backend):", data);

    try {
      // Para PUT, o ID é obrigatório.
      // O `id` do `useParams` é a fonte confiável do ID para a atualização.
      const categoriaParaPut: Categoria = {
          id: Number(id), // Usamos o ID da URL, garantindo que seja um número.
          nome: data.nome
          // outros campos se houver
      };

      await putCategoria(categoriaParaPut);
      toast.success('Categoria atualizada com sucesso!');
      navigate('/categorias');
    } catch (error: any) {
      tratarErro(error, 'Erro ao salvar a categoria.');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh' }}>
      <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Editar Categoria {/* Título fixo para Edição */}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2, p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Campo ID (oculto para o usuário) - Necessário para o put, mas gerenciado pelo hook */}
        <input type="hidden" {...register('id', { valueAsNumber: true })} />

        <TextField
          id="nome"
          label="Nome da Categoria"
          variant="outlined"
          fullWidth
          {...register('nome')}
          error={!!errors.nome}
          helperText={errors.nome ? errors.nome.message : ''}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/categorias')}
            sx={{ textTransform: 'none' }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' }, textTransform: 'none' }}
          >
            Atualizar {/* Texto fixo para Atualizar */}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default FormCategoriaEdicao;