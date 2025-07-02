/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from 'react-router-dom';
// Mudar para postCategoria, pois só faremos POST aqui


import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Typography, Button, TextField } from '@mui/material';
import type Categoria from '../../components/models/Categoria';
import { postCategoria } from '../../services/CategoriaService';
import { tratarErro } from '../../services/TratarErro';



// Esquema de validação com Zod
const categoriaSchema = z.object({
  // Não precisamos de 'id' no schema para um formulário APENAS DE CADASTRO
  nome: z.string()
    .min(3, { message: 'O Nome da Categoria é obrigatório e deve ter no mínimo 3 caracteres.' })
    .max(100, { message: 'O Nome da Categoria deve ter no máximo 100 caracteres.' }),
});

type CategoriaFormInputs = z.infer<typeof categoriaSchema>;

function FormCategoria() {
  const navigate = useNavigate();

  // Não precisamos de 'id' do useParams aqui
  // const { id } = useParams<{ id: string }>();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CategoriaFormInputs>({ // Adicionado 'reset'
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      nome: '',
    },
  });

  const onSubmit = async (data: CategoriaFormInputs) => {
    console.log("Dados enviados para o backend (Cadastro):", data);

    try {
      // Para POST, o backend do professor espera { "id": 0, "nome": "string" }
      const categoriaParaPost: Categoria = {
          id: 0, // Conforme o Swagger do professor para POST de Categoria
          nome: data.nome
      };
      await postCategoria(categoriaParaPost);
      toast.success('Categoria cadastrada com sucesso!');
      reset(); // Limpa o formulário após o sucesso
      navigate('/categorias'); // Redireciona para a lista após o cadastro
    } catch (error: any) {
      tratarErro(error, 'Erro ao salvar a categoria.');
    }
  };


  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh' }}>
      <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Cadastrar Nova Categoria {/* Título fixo para Cadastro */}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2, p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Campo ID (oculto) REMOVIDO, pois não é usado no cadastro */}
        {/* <input type="hidden" {...register('id', { valueAsNumber: true })} /> */}

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
            Cadastrar {/* Texto fixo para Cadastro */}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default FormCategoria;