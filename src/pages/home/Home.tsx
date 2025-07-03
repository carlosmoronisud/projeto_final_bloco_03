// src/pages/home/Home.tsx
import { Box, Typography, Button } from '@mui/material'; // Removido Grid
import { Link } from 'react-router-dom';

function Home() {
  return (
    // Box principal da Home com a cor de fundo ciano (do tema)
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        minHeight: 'calc(100vh - 64px - 80px)', // Altura mínima
        display: 'flex', // Habilita flexbox
        flexDirection: { xs: 'column', md: 'row' }, // Coluna em telas pequenas, linha em telas médias+
        alignItems: 'center', // Alinha itens ao centro no eixo cruzado
        justifyContent: 'center', // Justifica itens ao centro no eixo principal
        bgcolor: 'background.default', // Usar a cor de fundo padrão do tema (E0FFFF)
        gap: { xs: 4, md: 8 }, // Espaçamento entre as seções
      }}
    >
      {/* Seção de Texto e Botão (lado esquerdo/superior) */}
      <Box
        sx={{
          flex: 1, // Ocupa espaço flexível
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' }, // Alinhamento centralizado em XS, à esquerda em MD
          textAlign: { xs: 'center', md: 'left' }, // Texto centralizado em XS, à esquerda em MD
          maxWidth: { xs: '100%', md: '50%' }, // Ocupa até 50% da largura em telas médias+
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          fontWeight="bold"
          sx={{ color: 'text.primary', mb: 2, fontSize: { xs: '3rem', md: '4rem' } }}
        >
          Seja bem vinde!
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{ color: 'text.secondary', mb: 4, fontSize: { xs: '1.2rem', md: '1.5rem' } }}
        >
          Aqui você encontra Medicamentos e Cosméticos!
        </Typography>
        <Button
          component={Link}
          to="/cadastroProduto"
          variant="contained"
          sx={{
            bgcolor: '#673AB7',
            '&:hover': { bgcolor: '#5E35B1' },
            py: 1.5,
            px: 4,
            fontSize: '1.1rem',
            borderRadius: 2,
            boxShadow: 3,
            textTransform: 'none',
          }}
        >
          Cadastrar Produto
        </Button>
      </Box>

      {/* Seção da Imagem (lado direito/inferior) */}
      <Box
        sx={{
          flex: 1, // Ocupa espaço flexível
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: { xs: '100%', md: '50%' }, // Ocupa até 50% da largura em telas médias+
        }}
      >
        <Box
          component="img"
          src="https://ik.imagekit.io/8h7kfljfc/imagem/img/images-removebg-preview.png?updatedAt=1751501409939" // Substitua pela imagem real
          alt="Ilustração de Farmacêuticos"
          sx={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 2,
            boxShadow: 6,
            border: '2px solid #9370DB',
            p: 1,
            bgcolor: '#FFFFFF',
          }}
        />
      </Box>
    </Box>
  );
}

export default Home;